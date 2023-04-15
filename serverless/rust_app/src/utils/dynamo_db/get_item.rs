use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use aws_sdk_dynamodb::model::AttributeValue;
use dynamodb::model::ReturnConsumedCapacity;
use lambda_http::{aws_lambda_events::query_map::QueryMap, http::StatusCode, Body, Error};
use serde::{Deserialize, Serialize};
use serde_dynamo::from_item;
use std::env;

pub async fn get_item<'a, T: Deserialize<'a> + Serialize>(
    client: &dynamodb::Client,
    primary_key: AttributeValue,
    sort_key: AttributeValue,
) -> Result<T, (StatusCode, String)> {
    let result = match client
        .get_item()
        .table_name(env::var("TABLE_NAME").unwrap().to_string())
        .key("PK", primary_key)
        .key("SK", sort_key)
        .return_consumed_capacity(ReturnConsumedCapacity::Indexes)
        .send()
        .await
    {
        Ok(result) => result,
        Err(error) => {
            println!("ERROR: {error}");
            return Err((StatusCode::INTERNAL_SERVER_ERROR, error.to_string()));
        }
    };

    let item = match result.item() {
        Some(item) => item,
        None => return Err((StatusCode::NOT_FOUND, serde_json::json!(null).to_string())),
    }
    .clone();

    let typed_entity: T = match from_item(item.clone()) {
        Ok(item) => item,
        Err(error) => {
            println!(
                "Error converting DynamoDB item: {:?} into known type: {error}.",
                item
            );
            return Err((StatusCode::INTERNAL_SERVER_ERROR, error.to_string()));
        }
    };

    Ok(typed_entity)
}

pub async fn get_item_http<'a, T: Deserialize<'a> + Serialize>(
    client: &dynamodb::Client,
    querymap: QueryMap,
    primary_key: AttributeValue,
    sort_key: AttributeValue,
) -> Result<lambda_http::Response<Body>, Error> {
    match get_item::<T>(client, primary_key, sort_key).await {
        Ok(typed_entity) => utils::http::send_response(
            types::http::ApiResponseData::Single(typed_entity),
            Some(querymap),
            None,
        ),
        Err((status_code, message)) => utils::http::send_error(status_code, &message),
    }
}
