use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use dynamodb::model::AttributeValue;
use lambda_http::{aws_lambda_events::query_map::QueryMap, Body, Error, Response};

pub async fn batch_get_calendar_dates(
    client: &dynamodb::Client,
    dates: Vec<&str>,
    querymap: QueryMap,
) -> Result<Response<Body>, Error> {
    utils::dynamo_db::batch_get_item_http::<types::calendar_date::CalendarDate>(
        client,
        Vec::from(
            dates
                .iter()
                .map(|&date| {
                    (
                        AttributeValue::S("DATE".into()),
                        AttributeValue::S(format!("{date}")),
                    )
                })
                .collect::<Vec<(AttributeValue, AttributeValue)>>(),
        ),
    )
    .await
}
