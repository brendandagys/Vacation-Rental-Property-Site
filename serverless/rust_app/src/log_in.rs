use aws_sdk_dynamodb as dynamodb;
use chrono::Utc;
use dynamodb::model::AttributeValue;
use lambda_http::{
    http::{Method, StatusCode},
    run, service_fn, Body, Error, Request, Response,
};
use std::env;

mod types;
mod utils;

#[tokio::main]
async fn main() -> Result<(), Error> {
    let client = utils::dynamo_db::get_dynamo_db_client().await;

    run(service_fn(|request: Request| async {
        if request.method() == Method::OPTIONS {
            return Ok(utils::http::build_cors_response());
        }

        log_in(request, &client).await
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

async fn log_in(request: Request, client: &dynamodb::Client) -> Result<Response<Body>, Error> {
    match request.body() {
        Body::Text(body) => match serde_json::from_str::<types::log_in::LogInRequest>(body) {
            Ok(body) => {
                let username = body.username.trim().to_string();
                let password = body.password;

                if username == "" || password == "" {
                    return Ok(utils::http::send_error(
                        StatusCode::BAD_REQUEST,
                        "Please provide both necessary parameters: `email` and `password`.",
                    ));
                }

                // Fetch the user attempting to log in
                let user = match get_user_by_username(client, &username).await {
                    Ok(user) => user,
                    Err((status_code, ..)) => {
                        return Ok(utils::http::send_error(status_code, "User does not exist."))
                    }
                };

                // Retrieve the JWT secret
                let jwt_secret = match env::var("JWT_SECRET") {
                    Ok(secret) => secret,
                    Err(_) => {
                        return Ok(utils::http::send_error(
                            StatusCode::INTERNAL_SERVER_ERROR,
                            "Token secret not set. Please try again later.",
                        ))
                    }
                };

                // Build JWT token claims using some of the user's data
                let token_claims = types::log_in::JwtClaims {
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
                                    types::log_in::LogInResponse { token },
                                ),
                                None,
                                None,
                            ),
                            false => Ok(utils::http::send_error(
                                StatusCode::UNAUTHORIZED,
                                "Invalid password!",
                            )),
                        },
                        Err(error) => {
                            println!("Error: {:?}", error);
                            Ok(utils::http::send_error(
                                StatusCode::INTERNAL_SERVER_ERROR,
                                "Error validating password!",
                            ))
                        }
                    },
                    Err(error) => {
                        println!("Error: {:?}", error);
                        Ok(utils::http::send_error(
                            StatusCode::INTERNAL_SERVER_ERROR,
                            "Could not create token!",
                        ))
                    }
                }
            }
            Err(error) => {
                println!("Error: {:?}", error);
                Ok(utils::http::send_error(
                    StatusCode::BAD_REQUEST,
                    "Please provide both necessary parameters: `email` and `password`.",
                ))
            }
        },
        _ => Ok(utils::http::send_error(
            StatusCode::BAD_REQUEST,
            "Please provide a text body.",
        )),
    }
}
