use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use dynamodb::model::AttributeValue;
use lambda_http::{aws_lambda_events::query_map::QueryMap, Body, Error, Response};

pub async fn get_user_by_username(
    client: &dynamodb::Client,
    username: &str,
    querymap: QueryMap,
) -> Result<Response<Body>, Error> {
    utils::dynamo_db::get_item_http::<types::user::User>(
        &client,
        AttributeValue::S(format!("USER-{username}")),
        AttributeValue::S("USER-INFO".into()),
    )
    .await
}
