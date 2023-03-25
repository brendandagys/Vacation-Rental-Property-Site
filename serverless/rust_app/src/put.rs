use lambda_http::{http::StatusCode, run, service_fn, Body, Error, Request, Response};

mod put_handlers;
mod types;
mod utils;

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(service_fn(put)).await?;
    Ok(())
}

async fn put(request: Request) -> Result<Response<Body>, Error> {
    let client = utils::dynamo_db::get_dynamo_db_client().await;

    match request.body() {
        Body::Text(body) => match serde_json::from_str::<types::PutRequestEntity>(body) {
            Ok(put_request_entity) => match put_request_entity {
                types::PutRequestEntity::BookingInquiryRequest(booking_inquiry) => {
                    put_handlers::booking_inquiry::put_booking_inquiry(booking_inquiry, client)
                        .await
                }
                types::PutRequestEntity::CalendarDateRequest(calendar_date) => {
                    put_handlers::calendar_date::put_calendar_date(calendar_date, client).await
                }
                types::PutRequestEntity::ContentRequest(content) => {
                    put_handlers::content::put_content(content, client).await
                }
                types::PutRequestEntity::DefaultRequest(default) => {
                    put_handlers::default::put_default(default, client).await
                }
                types::PutRequestEntity::TestimonialRequest(testimonial) => {
                    put_handlers::testimonial::put_testimonial(testimonial, client).await
                }
                types::PutRequestEntity::UserRequest(user) => {
                    put_handlers::user::put_user(user, client).await
                }

                types::PutRequestEntity::CalendarDatesRequest(calendar_dates) => {
                    put_handlers::calendar_date::put_calendar_dates(calendar_dates, client).await
                }
                types::PutRequestEntity::ContentsRequest(contents) => {
                    put_handlers::content::put_contents(contents, client).await
                }
                types::PutRequestEntity::DefaultsRequest(defaults) => {
                    put_handlers::default::put_defaults(defaults, client).await
                }
            },
            Err(error) => Ok(utils::http::build_http_response(
                StatusCode::BAD_REQUEST,
                &format!("Please provide a valid entity. ERROR: {error}"),
            )),
        },
        _ => Ok(utils::http::build_http_response(
            StatusCode::BAD_REQUEST,
            "Please provide a text body.",
        )),
    }
}
