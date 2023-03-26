use aws_sdk_dynamodb as dynamodb;
use dynamodb::model::AttributeValue;
use lambda_http::{
    aws_lambda_events::query_map::QueryMap, http::StatusCode, run, service_fn, Body, Error,
    Request, Response,
};
use std::env;

mod types;
mod utils;

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(service_fn(log_in)).await?;
    Ok(())
}

// use crate::{types, utils};

// use dynamodb::model::AttributeValue;
// use lambda_http::{aws_lambda_events::query_map::QueryMap, Body, Error, Response};

async fn get_user_by_username(
    client: dynamodb::Client,
    username: &str,
) -> Result<Response<Body>, Error> {
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
                println!("Body: {:?}", body);

                let username = body.username.trim().to_string();
                let password = body.password;

                if username == "" || password == "" {
                    return Ok(Response::builder().status(StatusCode::BAD_REQUEST).body(
                        "Please provide both necessary parameters: `email` and `password`.".into(),
                    )?);
                }

                // Get User...
                // let client = utils::dynamo_db::get_dynamo_db_client().await;

                // let user = match get_user_by_username(client, &username).await {
                //     Ok(user) => match user {
                //       Response
                //     },
                //     Err(error) => {
                //         println!("Error getting user with username `{username}`: {error}");

                //         return Ok(utils::http::build_http_response(
                //             StatusCode::BAD_REQUEST,
                //             &error.to_string(),
                //         ));
                //     }
                // };

                let hash_text = "$2b$12$MRG2KRixMBO3KxixKBGzLuDpOEpY8DdwmyxKIft7C.TUwYrL2/tFW";

                let jwt_secret = env::var("JWT_SECRET").unwrap_or("".into());

                if jwt_secret == "" {
                    return Ok(Response::builder()
                        .status(StatusCode::INTERNAL_SERVER_ERROR)
                        .body("Token secret not set. Please try again later.".into())?);
                }

                let token_data = types::log_in::JwtContent {
                    username,
                    last: "Dagys".into(),
                    first: "Brendan".into(),
                };

                match jsonwebtoken::encode(
                    &jsonwebtoken::Header::default(),
                    &token_data,
                    &jsonwebtoken::EncodingKey::from_secret(&jwt_secret.into_bytes()),
                ) {
                    Ok(token) => match bcrypt::verify(password, &hash_text) {
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
