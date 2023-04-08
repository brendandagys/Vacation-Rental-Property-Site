use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use dynamodb::model::AttributeValue;
use lambda_http::{
    aws_lambda_events::query_map::QueryMap, http::StatusCode, Body, Error, Response,
};

pub async fn get_content_by_content_id(
    client: &dynamodb::Client,
    content_id: &types::content::ContentId,
) -> Result<types::content::Content, (StatusCode, String)> {
    utils::dynamo_db::get_item::<types::content::Content>(
        client,
        AttributeValue::S("CONTENT".into()),
        AttributeValue::S(format!("{:?}", content_id)),
    )
    .await
}

pub async fn get_content_by_content_id_http(
    client: &dynamodb::Client,
    content_id: &types::content::ContentId,
    querymap: QueryMap,
) -> Result<Response<Body>, Error> {
    utils::dynamo_db::get_item_http::<types::content::Content>(
        client,
        querymap,
        AttributeValue::S("CONTENT".into()),
        AttributeValue::S(format!("{:?}", content_id)),
    )
    .await
}
