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
                // types::PutRequestEntities::BookingRequest(booking) => {}
                // types::PutRequestEntities::TestimonialRequest(testimonial) => {}
                // types::PutRequestEntities::UserRequest(user) => {}
                types::PutRequestEntities::CalendarDateRequest(calendar_date) => {
                    put_item_handlers::calendar_date::put_calendar_date(calendar_date, client).await
                }
            },
            Err(_) => Ok(utils::build_http_response(
                StatusCode::BAD_REQUEST,
                "Please provide a valid entity.",
            )),
        },
        _ => Ok(utils::build_http_response(
            StatusCode::BAD_REQUEST,
            "Please provide a text body.",
        )),
    }
}
