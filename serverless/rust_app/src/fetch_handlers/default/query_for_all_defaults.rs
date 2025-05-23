use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use dynamodb::types::AttributeValue;
use lambda_http::{aws_lambda_events::query_map::QueryMap, Body, Error, Response};

pub async fn query_for_all_defaults(
    client: &dynamodb::Client,
    querymap: QueryMap,
) -> Result<Response<Body>, Error> {
    utils::dynamo_db::query_http::<types::default::Default>(
        client,
        querymap,
        None,
        "#field = :value".to_string(),
        &[("#field", "PK")],
        vec![(":value", AttributeValue::S("DEFAULT".into()))],
        false,
    )
    .await
}
