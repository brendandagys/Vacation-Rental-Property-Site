use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use dynamodb::types::AttributeValue;
use lambda_http::{
    aws_lambda_events::query_map::QueryMap, http::StatusCode, Body, Error, Response,
};

pub async fn get_default_by_name(
    client: &dynamodb::Client,
    default_for: &str,
) -> Result<types::default::Default, (StatusCode, String)> {
    utils::dynamo_db::get_item::<types::default::Default>(
        client,
        AttributeValue::S("DEFAULT".into()),
        AttributeValue::S(format!("{default_for}")),
    )
    .await
}

pub async fn get_default_by_name_http(
    client: &dynamodb::Client,
    default_for: &str,
    querymap: QueryMap,
) -> Result<Response<Body>, Error> {
    utils::dynamo_db::get_item_http::<types::default::Default>(
        client,
        querymap,
        AttributeValue::S("DEFAULT".into()),
        AttributeValue::S(format!("{default_for}")),
    )
    .await
}
