use lambda_http::{http::StatusCode, service_fn, Body, Error, Request, Response};

mod put_item_handlers;
mod types;
mod utils;

#[tokio::main]
async fn main() -> Result<(), Error> {
    lambda_http::run(service_fn(put_item)).await?;
    Ok(())
}

async fn put_item(request: Request) -> Result<Response<Body>, Error> {
    let client = utils::get_dynamo_db_client().await;

    match request.body() {
        Body::Text(body) => match serde_json::from_str::<types::PutRequestEntities>(body) {
            Ok(put_request_body) => match put_request_body {
                types::PutRequestEntities::BookingInquiry(booking_inquiry) => {
                    put_item_handlers::booking_inquiry::put_booking_inquiry(booking_inquiry, client)
                        .await
                }
                types::PutRequestEntities::CalendarDateRequest(calendar_date) => {
                    put_item_handlers::calendar_date::put_calendar_date(calendar_date, client).await
                }
                types::PutRequestEntities::ContentRequest(content) => {
                    put_item_handlers::content::put_content(content, client).await
                }
                types::PutRequestEntities::DefaultRequest(default) => {
                    put_item_handlers::default::put_default(default, client).await
                }
                types::PutRequestEntities::TestimonialRequest(testimonial) => {
                    put_item_handlers::testimonial::put_testimonial(testimonial, client).await
                }
                types::PutRequestEntities::UserRequest(user) => {
                    put_item_handlers::user::put_user(user, client).await
                }
            },
            Err(error) => Ok(utils::build_http_response(
                StatusCode::BAD_REQUEST,
                &format!("Please provide a valid entity. ERROR: {error}"),
            )),
        },
        _ => Ok(utils::build_http_response(
            StatusCode::BAD_REQUEST,
            "Please provide a text body.",
        )),
    }
}
