use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use dynamodb::model::AttributeValue;
use lambda_http::{aws_lambda_events::query_map::QueryMap, Body, Error, Response};

pub async fn get_default_by_name(
    client: &dynamodb::Client,
    default_for: &str,
    querymap: QueryMap,
) -> Result<Response<Body>, Error> {
    utils::dynamo_db::get_item_http::<types::default::Default>(
        &client,
        AttributeValue::S("DEFAULT".into()),
        AttributeValue::S(format!("{default_for}")),
    )
    .await
}
