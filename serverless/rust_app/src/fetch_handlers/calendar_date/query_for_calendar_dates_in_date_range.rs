use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use dynamodb::model::AttributeValue;
use lambda_http::{aws_lambda_events::query_map::QueryMap, Body, Error, Response};

pub async fn query_for_calendar_dates_in_date_range(
    client: &dynamodb::Client,
    (start_date, end_date): (&str, &str),
    querymap: QueryMap,
) -> Result<Response<Body>, Error> {
    let found_calendar_dates = match utils::dynamo_db::query::<types::calendar_date::CalendarDate>(
        client,
        None,
        "#key1 = :value1 AND #key2 BETWEEN :value2 AND :value3".to_string(),
        &[("#key1", "PK"), ("#key2", "SK")],
        vec![
            (":value1", AttributeValue::S("DATE".into())),
            (":value2", AttributeValue::S(format!("{start_date}"))),
            (":value3", AttributeValue::S(format!("{end_date}"))),
        ],
        None,
    )
    .await
    {
        Ok(calendar_dates) => calendar_dates,
        Err((status_code, error_message)) => {
            return Ok(utils::http::build_http_response(
                status_code,
                &error_message,
            ))
        }
    };

    let mut dates = Vec::new();

    let current_date = chrono::NaiveDate::parse_from_str(start_date, "%Y-%m-%d").unwrap();
    let end_date = chrono::NaiveDate::parse_from_str(end_date, "%Y-%m-%d").unwrap();

    while current_date <= end_date {
        dates.push(current_date.format("%Y-%m-%d").to_string());
        current_date.checked_add_days(chrono::Days::new(1));
    }

    let all_requested_calendar_dates =
        match super::get_missing_calendar_dates(client, found_calendar_dates, dates).await {
            Ok(calendar_dates) => calendar_dates,
            Err((status_code, error_message)) => {
                return Ok(utils::http::build_http_response(
                    status_code,
                    &error_message,
                ))
            }
        };

    utils::dynamo_db::serialize_response(
        types::http::ApiResponseData::Multiple(all_requested_calendar_dates),
        Some(querymap),
        None,
    )
}
