use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use dynamodb::model::AttributeValue;
use lambda_http::{aws_lambda_events::query_map::QueryMap, Body, Error, Response};

pub async fn batch_get_calendar_dates(
    client: &dynamodb::Client,
    dates: Vec<String>,
    querymap: QueryMap,
) -> Result<Response<Body>, Error> {
    let found_calendar_dates =
        match utils::dynamo_db::batch_get_item::<types::calendar_date::CalendarDate>(
            client,
            Vec::from(
                dates
                    .iter()
                    .map(|date| {
                        (
                            AttributeValue::S("DATE".into()),
                            AttributeValue::S(date.clone()),
                        )
                    })
                    .collect::<Vec<(AttributeValue, AttributeValue)>>(),
            ),
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
