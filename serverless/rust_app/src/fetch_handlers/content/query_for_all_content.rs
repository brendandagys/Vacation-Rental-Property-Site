use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use dynamodb::types::AttributeValue;
use lambda_http::{aws_lambda_events::query_map::QueryMap, Body, Error, Response};

pub async fn query_for_all_content(
    client: &dynamodb::Client,
    querymap: QueryMap,
) -> Result<Response<Body>, Error> {
    utils::dynamo_db::query_http::<types::content::Content>(
        client,
        querymap,
        Some(types::Index::GSI1),
        "#field = :value".to_string(),
        &[("#field", "GSI-PK")],
        vec![(":value", AttributeValue::S("CONTENT".into()))],
        false,
    )
    .await
}
