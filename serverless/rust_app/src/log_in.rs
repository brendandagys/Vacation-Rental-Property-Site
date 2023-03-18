use lambda_http::{http::StatusCode, service_fn, Body, Error, Request, Response};
use std::env;

mod types;

#[tokio::main]
async fn main() -> Result<(), Error> {
    lambda_http::run(service_fn(log_in)).await?;
    Ok(())
}

async fn log_in(request: Request) -> Result<Response<Body>, Error> {
    match request.body() {
        Body::Text(body) => match serde_json::from_str::<types::log_in::LogInRequest>(body) {
            Ok(body) => {
                println!("Body: {:?}", body);

                let email = body.email.trim().to_string();
                let password = body.password;

                if email == "" || password == "" {
                    return Ok(Response::builder().status(StatusCode::BAD_REQUEST).body(
                        "Please provide both necessary parameters: `email` and `password`.".into(),
                    )?);
                }

                // Get User...
                let hash_text = "$2b$12$MRG2KRixMBO3KxixKBGzLuDpOEpY8DdwmyxKIft7C.TUwYrL2/tFW";

                let jwt_secret = env::var("JWT_SECRET").unwrap_or("".into());

                if jwt_secret == "" {
                    return Ok(Response::builder()
                        .status(StatusCode::INTERNAL_SERVER_ERROR)
                        .body("Token secret not set. Please try again later.".into())?);
                }

                let token_data = types::log_in::JwtContent {
                    email,
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
