mod delete_handlers;
mod fetch_handlers;
mod types;
mod utils;

use aws_sdk_dynamodb as dynamodb;
use lambda_http::{http::StatusCode, run, service_fn, Body, Error, Request, Response};

#[tokio::main]
async fn main() -> Result<(), Error> {
    let client = utils::dynamo_db::get_dynamo_db_client().await;

    run(service_fn(|request: Request| async {
        delete(request, &client).await
    }))
    .await?;

    Ok(())
}

async fn delete(request: Request, client: &dynamodb::Client) -> Result<Response<Body>, Error> {
    match request.body() {
        Body::Text(body) => match serde_json::from_str::<types::DeleteRequestEntity>(body) {
            Ok(delete_request_entity) => {
                let token = match request.headers().get("Authorization") {
                    Some(token) => token,
                    None => {
                        return utils::http::send_error(
                            StatusCode::UNAUTHORIZED,
                            "No `Authorization` header provided.",
                        )
                    }
                };

                match utils::auth::validate_token::<types::auth::JwtClaims>(token.to_str().unwrap())
                {
                    Ok(_) => {}
                    Err(error) => {
                        println!("Error validating token: {error}");
                        return utils::http::send_error(StatusCode::UNAUTHORIZED, "Invalid token.");
                    }
                };

                match delete_request_entity {
                    types::DeleteRequestEntity::TestimonialDeleteRequest(delete_req) => {
                        delete_handlers::testimonial::delete_testimonial(client, delete_req).await
                    }
                }
            }
            Err(error) => utils::http::send_error(
                StatusCode::BAD_REQUEST,
                &format!("Please provide a valid entity. ERROR: {error}"),
            ),
        },
        _ => utils::http::send_error(StatusCode::BAD_REQUEST, "Please provide a text body."),
    }
}
