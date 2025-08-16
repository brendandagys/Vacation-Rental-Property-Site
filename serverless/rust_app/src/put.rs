mod fetch_handlers;
mod put_handlers;
mod types;
mod utils;

use aws_sdk_dynamodb as dynamodb;
use lambda_http::{http::StatusCode, run, service_fn, Body, Error, Request, Response};

#[tokio::main]
async fn main() -> Result<(), Error> {
    let client = utils::dynamo_db::get_dynamo_db_client().await;

    run(service_fn(|request: Request| async {
        put(request, &client).await
    }))
    .await?;

    Ok(())
}

async fn put(request: Request, client: &dynamodb::Client) -> Result<Response<Body>, Error> {
    match request.body() {
        Body::Text(body) => match serde_json::from_str::<types::PutRequestEntity>(body) {
            Ok(put_request_entity) => {
                if let types::PutRequestEntity::BookingInquiryRequest(booking_inquiry) =
                    put_request_entity
                {
                    return put_handlers::booking_inquiry::put_booking_inquiry(
                        client,
                        booking_inquiry,
                    )
                    .await;
                }

                if let types::PutRequestEntity::TestimonialRequest(testimonial) = put_request_entity
                {
                    return put_handlers::testimonial::put_testimonial(client, testimonial).await;
                }

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

                match put_request_entity {
                    types::PutRequestEntity::CalendarDateRequest(calendar_date) => {
                        put_handlers::calendar_date::put_calendar_date(client, calendar_date).await
                    }
                    types::PutRequestEntity::ContentRequest(content) => {
                        put_handlers::content::put_content(client, content).await
                    }
                    types::PutRequestEntity::DefaultRequest(default) => {
                        put_handlers::default::put_default(client, default).await
                    }
                    types::PutRequestEntity::UserRequest(user) => {
                        put_handlers::user::put_user(client, user).await
                    }
                    types::PutRequestEntity::TestimonialToggleRequest(toggle_req) => {
                        put_handlers::testimonial_toggle::toggle_testimonial_active(
                            client, toggle_req,
                        )
                        .await
                    }

                    types::PutRequestEntity::CalendarDatesRequest(calendar_dates) => {
                        put_handlers::calendar_date::put_calendar_dates(client, calendar_dates)
                            .await
                    }
                    types::PutRequestEntity::ContentsRequest(contents) => {
                        put_handlers::content::put_contents(client, contents).await
                    }
                    types::PutRequestEntity::DefaultsRequest(defaults) => {
                        put_handlers::default::put_defaults(client, defaults).await
                    }

                    _ => panic!("Unreachable"),
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
