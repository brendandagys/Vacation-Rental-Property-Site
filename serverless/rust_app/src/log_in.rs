use aws_sdk_dynamodb as dynamodb;
use chrono::Utc;
use dynamodb::model::AttributeValue;
use lambda_http::{http::StatusCode, run, service_fn, Body, Error, Request, Response};
use std::env;

mod types;
mod utils;

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(service_fn(log_in)).await?;
    Ok(())
}

async fn get_user_by_username(
    client: dynamodb::Client,
    username: &str,
) -> Result<types::user::User, (StatusCode, String)> {
    utils::dynamo_db::get_item::<types::user::User>(
        client,
        AttributeValue::S(format!("USER-{username}")),
        AttributeValue::S("USER-INFO".into()),
    )
    .await
}

async fn log_in(request: Request) -> Result<Response<Body>, Error> {
    match request.body() {
        Body::Text(body) => match serde_json::from_str::<types::log_in::LogInRequest>(body) {
            Ok(body) => {
                let username = body.username.trim().to_string();
                let password = body.password;

                if username == "" || password == "" {
                    return Ok(Response::builder().status(StatusCode::BAD_REQUEST).body(
                        "Please provide both necessary parameters: `email` and `password`.".into(),
                    )?);
                }

                let client = utils::dynamo_db::get_dynamo_db_client().await;

                let user = match get_user_by_username(client, &username).await {
                    Ok(user) => user,
                    Err((status_code, message)) => {
                        return Ok(utils::http::build_http_response(status_code, &message))
                    }
                };

                let jwt_secret = env::var("JWT_SECRET").unwrap_or("".into());

                if jwt_secret == "" {
                    return Ok(Response::builder()
                        .status(StatusCode::INTERNAL_SERVER_ERROR)
                        .body("Token secret not set. Please try again later.".into())?);
                }

                let token_claims = types::log_in::JwtClaims {
                    username,
                    last: "Dagys".into(),
                    first: "Brendan".into(),
                    exp: Utc::now()
                        .checked_add_signed(chrono::Duration::days(1))
                        .unwrap()
                        .timestamp(),
                };

                match jsonwebtoken::encode(
                    &jsonwebtoken::Header::default(),
                    &token_claims,
                    &jsonwebtoken::EncodingKey::from_secret(&jwt_secret.into_bytes()),
                ) {
                    Ok(token) => match bcrypt::verify(password, &user.hash) {
                        Ok(valid) => match valid {
                            true => {
                                match serde_json::to_string(&types::log_in::LogInResponse { token })
                                {
                                    Ok(string) => Ok(Response::builder().body(string.into())?),
                                    Err(error) => {
                                        println!("Error: {:?}", error);
                                        Ok(Response::builder()
                                            .status(StatusCode::INTERNAL_SERVER_ERROR)
                                            .body("Error".into())?)
                                    }
                                }
                            }
                            false => Ok(Response::builder()
                                .status(StatusCode::UNAUTHORIZED)
                                .body("Invalid password".into())?),
                        },
                        Err(error) => {
                            println!("Error: {:?}", error);
                            Ok(Response::builder()
                                .status(StatusCode::INTERNAL_SERVER_ERROR)
                                .body("Error validating password!".into())?)
                        }
                    },
                    Err(error) => {
                        println!("Error: {:?}", error);
                        Ok(Response::builder()
                            .status(StatusCode::INTERNAL_SERVER_ERROR)
                            .body("Could not create token!".into())?)
                    }
                }
            }
            Err(error) => {
                println!("Error: {:?}", error);
                Ok(Response::builder().status(StatusCode::BAD_REQUEST).body(
                    "Please provide both necessary parameters: `email` and `password`.".into(),
                )?)
            }
        },
        _ => Ok(Response::builder()
            .status(StatusCode::BAD_REQUEST)
            .body("Please provide a text body.".into())?),
    }
}
