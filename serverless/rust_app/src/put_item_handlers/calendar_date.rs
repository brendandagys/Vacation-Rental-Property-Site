use crate::{types, utils};
use aws_sdk_dynamodb as dynamodb;
use dynamodb::model::AttributeValue;
use lambda_http::{http::StatusCode, Body, Error};

pub async fn put_calendar_date(
    calendar_date: types::CalendarDate,
    client: dynamodb::Client,
) -> Result<lambda_http::Response<Body>, Error> {
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
