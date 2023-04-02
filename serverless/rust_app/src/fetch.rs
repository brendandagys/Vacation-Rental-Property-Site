mod fetch_handlers;
mod types;
mod utils;

use aws_sdk_dynamodb as dynamodb;
use lambda_http::{http::StatusCode, run, service_fn, Body, Error, Request, RequestExt, Response};

#[tokio::main]
async fn main() -> Result<(), Error> {
    let client = utils::dynamo_db::get_dynamo_db_client().await;

    run(service_fn(|request| async {
        fetch(request, &client).await
    }))
    .await?;

    Ok(())
}

async fn fetch(request: Request, client: &dynamodb::Client) -> Result<Response<Body>, Error> {
    let querymap = request.query_string_parameters();

    match querymap.first("entity") {
        Some(entity) => match entity {
            "BookingInquiry" => fetch_handlers::booking_inquiry::get(client, querymap).await,
            "CalendarDate" => fetch_handlers::calendar_date::get(client, querymap).await,
            "Content" => fetch_handlers::content::query_for_all_content(client, querymap).await,
            "Default" => fetch_handlers::default::get(client, querymap).await,
            "Testimonial" => fetch_handlers::testimonial::get(client, querymap).await,
            "User" => fetch_handlers::user::get(client, request.headers(), querymap).await,
            &_ => Ok(utils::http::build_http_response(StatusCode::OK, "Please specify one of the following entity types: `BookingInquiry`, `CalendarDate`, `Content`, `Default`, `Testimonial`, `User`.")),
        },
        None => Ok(utils::http::build_http_response(
            StatusCode::BAD_REQUEST,
            "Please provide a valid `entity` type via query string.",
        )),
    }
}
