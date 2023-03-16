use aws_sdk_dynamodb as dynamodb;
use dynamodb::model::AttributeValue;
use lambda_http::{http::StatusCode, service_fn, Body, Error, Request, Response};

mod types;
mod utils;

#[tokio::main]
async fn main() -> Result<(), Error> {
    lambda_http::run(service_fn(put_item)).await?;
    Ok(())
}

async fn put_item(request: Request) -> Result<Response<Body>, Error> {
    match request.body() {
        Body::Text(body) => match serde_json::from_str::<types::CalendarDate>(body) {
            Ok(calendar_date) => {
                let types::CalendarDate {
                    primary_key,
                    sort_key,
                    ymd,
                    state,
                    price,
                    year,
                    month,
                    date,
                    cell_color,
                    created,
                    modified,
                } = calendar_date.clone();

                let client = utils::get_dynamo_db_client().await;

                match client
                    .put_item()
                    .table_name("business-site")
                    .item("PK", AttributeValue::S(primary_key))
                    .item("SK", AttributeValue::S(sort_key))
                    .item("ymd", AttributeValue::S(ymd))
                    .item("state", AttributeValue::S(format!("{:?}", state.unwrap())))
                    .item("price", AttributeValue::N(format!("{}", price.unwrap())))
                    .item("year", AttributeValue::N(year.to_string()))
                    .item("month", AttributeValue::N(month.to_string()))
                    .item("date", AttributeValue::N(date.to_string()))
                    .item(
                        "cell_color",
                        AttributeValue::S(cell_color.unwrap_or("".into())),
                    )
                    .item("created", AttributeValue::S(created.unwrap()))
                    .item("modified", AttributeValue::S(modified.unwrap()))
                    .send()
                    .await
                {
                    Ok(calendar_date) => Ok(utils::build_http_response(
                        StatusCode::OK,
                        &format!("PUT item: {:?}", calendar_date),
                    )),
                    Err(error) => Ok(utils::build_http_response(
                        StatusCode::INTERNAL_SERVER_ERROR,
                        &error.to_string(),
                    )),
                }
            }
            Err(_) => Ok(utils::build_http_response(
                StatusCode::BAD_REQUEST,
                "Invalid `CalendarDate` provided.",
            )),
        },
        _ => Ok(utils::build_http_response(
            StatusCode::BAD_REQUEST,
            "Please provide a text body.",
        )),
    }
}
