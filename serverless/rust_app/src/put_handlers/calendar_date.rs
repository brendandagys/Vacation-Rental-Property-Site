use crate::{
    types::{self, BuildFunction, Buildable},
    utils::{self, dynamo_db::batch_write_item},
};

use aws_sdk_dynamodb as dynamodb;
use chrono::{DateTime, Utc};
use dynamodb::{
    client::fluent_builders::PutItem,
    model::{AttributeValue, PutRequest, WriteRequest},
};
use lambda_http::{http::StatusCode, Body, Error};

pub fn build_calendar_date_item<T: Buildable>(
    mut builder: T,
    calendar_date: types::calendar_date::CalendarDatePutRequest,
    now: DateTime<Utc>,
) -> T {
    let types::calendar_date::CalendarDatePutRequest {
        ymd,
        state,
        price,
        year,
        month,
        date,
        cell_color,
    } = calendar_date;

    let ensure_state = state.unwrap_or(types::calendar_date::DateState::Available);

    builder = builder
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

    if let Some(cell_color) = cell_color {
        builder = builder.item("cell_color", AttributeValue::S(cell_color))
    }

    builder.item("created", AttributeValue::S(now.to_string()))
}

struct BuildCalendarDate {}

impl BuildFunction<PutItem, types::calendar_date::CalendarDatePutRequest> for BuildCalendarDate {
    fn build_item(
        &self,
        builder: PutItem,
        calendar_date_put_request: types::calendar_date::CalendarDatePutRequest,
        now: DateTime<Utc>,
    ) -> PutItem {
        build_calendar_date_item(builder, calendar_date_put_request, now)
    }
}

pub async fn put_calendar_date(
    client: &dynamodb::Client,
    calendar_date: types::calendar_date::CalendarDatePutRequest,
) -> Result<lambda_http::Response<Body>, Error> {
    let calendar_date_builder = BuildCalendarDate {};

    if calendar_date.ymd.len() != 10 {
        return utils::http::send_error(
            StatusCode::BAD_REQUEST,
            "Please provide a valid YYYY-MM-DD string.",
        );
    }

    utils::dynamo_db::put_item_http::<types::calendar_date::CalendarDatePutRequest>(
        client,
        calendar_date_builder,
        calendar_date,
    )
    .await
}

pub async fn put_calendar_dates(
    client: &dynamodb::Client,
    calendar_dates: Vec<types::calendar_date::CalendarDatePutRequest>,
) -> Result<lambda_http::Response<Body>, Error> {
    let now = Utc::now();

    let write_requests = calendar_dates
        .into_iter()
        .map(|calendar_date| {
            let put_request_builder = PutRequest::builder();

            WriteRequest::builder()
                .put_request(
                    build_calendar_date_item(put_request_builder, calendar_date, now).build(),
                )
                .build()
        })
        .collect();

    batch_write_item(client, write_requests).await
}
