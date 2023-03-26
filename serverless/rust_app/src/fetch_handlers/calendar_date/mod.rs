mod batch_get_calendar_dates;
use batch_get_calendar_dates::batch_get_calendar_dates;

mod query_for_calendar_dates_by_state;
use query_for_calendar_dates_by_state::query_for_calendar_dates_by_state;

mod query_for_calendar_dates_in_date_range;
use query_for_calendar_dates_in_date_range::query_for_calendar_dates_in_date_range;

use crate::utils;

use aws_sdk_dynamodb as dynamodb;
use lambda_http::{
    aws_lambda_events::query_map::QueryMap, http::StatusCode, Body, Error, Response,
};

pub async fn get(client: &dynamodb::Client, querymap: QueryMap) -> Result<Response<Body>, Error> {
    if let Some(dates) = querymap.all("dates") {
        return batch_get_calendar_dates(client, dates, querymap.clone()).await;
    }

    if let Some(state) = querymap.first("state") {
        return query_for_calendar_dates_by_state(client, state, querymap.clone()).await;
    }

    let start_date = querymap.first("start_date");
    let end_date = querymap.first("end_date");

    if start_date.is_some() & end_date.is_some() {
        return query_for_calendar_dates_in_date_range(
            client,
            (start_date.unwrap(), end_date.unwrap()),
            querymap.clone(),
        )
        .await;
    }

    return Ok(utils::http::build_http_response(
        StatusCode::BAD_REQUEST,
        "Invalid parameters provided to fetch `CalendarDate`.",
    ));
}
