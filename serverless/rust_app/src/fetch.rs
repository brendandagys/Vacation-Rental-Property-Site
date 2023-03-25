use lambda_http::{http::StatusCode, run, service_fn, Body, Error, Request, RequestExt, Response};

mod fetch_handlers;
mod types;
mod utils;

#[tokio::main]
async fn main() -> Result<(), lambda_http::Error> {
    run(service_fn(fetch)).await?;
    Ok(())
}

fn stub() -> Result<Response<Body>, Error> {
    Ok(utils::http::build_http_response(StatusCode::OK, "STUB."))
}

async fn fetch(request: Request) -> Result<Response<Body>, Error> {
    let client = utils::dynamo_db::get_dynamo_db_client().await;
    let querymap = request.query_string_parameters();
    match querymap.first("entity") {
        Some(entity) => match entity {
            "BookingInquiry" => fetch_handlers::booking_inquiry::get(client, querymap).await,
            "CalendarDate" => fetch_handlers::calendar_date::get(client, querymap).await,
            "Content" => fetch_handlers::content::query_for_all_content(client, querymap).await,
            "Default" => fetch_handlers::default::query_for_all_defaults(client, querymap).await,
            "Testimonial" => stub(),
            "User" => fetch_handlers::user::get(client, querymap).await,
            &_ => Ok(utils::http::build_http_response(StatusCode::OK, "Please specify one of the following entity types: `BookingInquiry`, `CalendarDate`, `Content`, `Default`, `Testimonial`, `User`.")),
        },
        None => Ok(utils::http::build_http_response(
            StatusCode::BAD_REQUEST,
            "Please provide a valid `entity` type via query string.",
        )),
    }
}
