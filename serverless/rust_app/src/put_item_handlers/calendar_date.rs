use crate::{types, utils};
use aws_sdk_dynamodb as dynamodb;
use chrono::Utc;
use dynamodb::model::AttributeValue;
use lambda_http::{http::StatusCode, Body, Error};
use std::env;

pub async fn put_calendar_date(
    calendar_date: types::calendar_date::CalendarDatePutRequest,
    client: dynamodb::Client,
) -> Result<lambda_http::Response<Body>, Error> {
    let types::calendar_date::CalendarDatePutRequest {
        ymd,
        state,
        price,
        year,
        month,
        date,
        cell_color,
    } = calendar_date;

    if ymd.len() != 10 {
        return Ok(utils::build_http_response(
            StatusCode::BAD_REQUEST,
            "Please provide a valid YYYY-MM-DD string.",
        ));
    }

    let ensure_state = state.unwrap_or(types::calendar_date::DateState::Available);

    let now = Utc::now();

    let mut builder = client
        .put_item()
        .table_name(env::var("TABLE_NAME").unwrap().to_string())
        .item("PK", AttributeValue::S("DATE".into()))
        .item("SK", AttributeValue::S(ymd.clone()))
        .item("GSI-PK", AttributeValue::S("DATE".into()))
        .item("GSI-SK", AttributeValue::S(format!("{:?}", ensure_state)))
        .item("ymd", AttributeValue::S(ymd))
        .item("state", AttributeValue::S(format!("{:?}", ensure_state)))
        .item("price", AttributeValue::N(format!("{}", price)))
        .item("year", AttributeValue::N(year.to_string()))
        .item("month", AttributeValue::N(month.to_string()))
        .item("date", AttributeValue::N(date.to_string()));

    builder = utils::append_string_item_if_exists(builder, "cell_color", cell_color);

    utils::send_and_handle_put_item_request(builder, now).await
}
