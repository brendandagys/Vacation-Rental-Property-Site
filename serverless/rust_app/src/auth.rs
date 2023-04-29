mod types;
mod utils;

use aws_sdk_dynamodb as dynamodb;
use chrono::Utc;
use dynamodb::model::AttributeValue;
use lambda_http::{
    http::{Method, StatusCode},
    run, service_fn, Body, Error, Request, Response,
};
use std::env;

#[tokio::main]
async fn main() -> Result<(), Error> {
    let client = utils::dynamo_db::get_dynamo_db_client().await;

    run(service_fn(|request: Request| async {
        if request.method() == Method::OPTIONS {
            return Ok(utils::http::build_cors_response());
        }

        auth(request, &client).await
    }))
    .await?;

    Ok(())
}

async fn get_user_by_username(
    client: &dynamodb::Client,
    username: &str,
) -> Result<types::user::User, (StatusCode, String)> {
    utils::dynamo_db::get_item::<types::user::User>(
        client,
        AttributeValue::S(format!("USER-{username}")),
        AttributeValue::S("USER-INFO".into()),
    )
    .await
}

async fn auth(request: Request, client: &dynamodb::Client) -> Result<Response<Body>, Error> {
    match request.body() {
        Body::Text(body) => match serde_json::from_str::<types::auth::AuthRequestEntity>(body) {
            Ok(auth_request_entity) => match auth_request_entity {
                types::auth::AuthRequestEntity::LogInRequest(log_in_request) => {
                    let username = log_in_request.username.trim().to_string();
                    let password = log_in_request.password;

                    if username == "" || password == "" {
                        return utils::http::send_error(
                            StatusCode::BAD_REQUEST,
                            "Please provide both necessary parameters: `username` and `password`.",
                        );
                    }

                    // Fetch the user attempting to log in
                    let user = match get_user_by_username(client, &username).await {
                        Ok(user) => user,
                        Err(_) => {
                            return utils::http::send_error(
                                StatusCode::BAD_REQUEST,
                                "Invalid username or password.",
                            )
                        }
                    };

                    // Retrieve the JWT secret
                    let jwt_secret = match env::var("JWT_SECRET") {
                        Ok(secret) => secret,
                        Err(_) => {
                            return utils::http::send_error(
                                StatusCode::INTERNAL_SERVER_ERROR,
                                "Token secret not set. Please try again later.",
                            )
                        }
                    };

                    // Build JWT token claims using some of the user's data
                    let token_claims = types::auth::JwtClaims {
                        username,
                        last: user.last,
                        first: user.first,
                        exp: Utc::now()
                            .checked_add_signed(chrono::Duration::days(1))
                            .unwrap()
                            .timestamp(),
                    };

                    // Create the JWT and send back if user credentials are valid
                    match jsonwebtoken::encode(
                        &jsonwebtoken::Header::default(),
                        &token_claims,
                        &jsonwebtoken::EncodingKey::from_secret(&jwt_secret.into_bytes()),
                    ) {
                        Ok(token) => match bcrypt::verify(password, &user.hash) {
                            Ok(valid) => match valid {
                                true => utils::http::send_response(
                                    types::http::ApiResponseData::Single(
                                        types::auth::LogInResponse { token },
                                    ),
                                    None,
                                    None,
                                    None,
                                ),
                                false => utils::http::send_error(
                                    StatusCode::UNAUTHORIZED,
                                    "Invalid username or password.",
                                ),
                            },
                            Err(error) => {
                                println!("Error: {:?}", error);
                                utils::http::send_error(
                                    StatusCode::INTERNAL_SERVER_ERROR,
                                    "Error validating password!",
                                )
                            }
                        },
                        Err(error) => {
                            println!("Error: {:?}", error);
                            utils::http::send_error(
                                StatusCode::INTERNAL_SERVER_ERROR,
                                "Could not create token!",
                            )
                        }
                    }
                }
                types::auth::AuthRequestEntity::ValidateTokenRequest(validate_token_request) => {
                    match utils::auth::validate_token::<types::auth::JwtClaims>(
                        &validate_token_request.token,
                    ) {
                        Ok(token_claims) => utils::http::send_response(
                            types::http::ApiResponseData::Single(token_claims),
                            None,
                            None,
                            None,
                        ),
                        Err(error) => {
                            utils::http::send_error(StatusCode::FORBIDDEN, &error.to_string())
                        }
                    }
                }
            },
            Err(error) => utils::http::send_error(
                StatusCode::BAD_REQUEST,
                &format!("Please provide a valid entity. ERROR: {error}"),
            ),
        },
        _ => utils::http::send_error(StatusCode::BAD_REQUEST, "Please provide a text body."),
    }
}
