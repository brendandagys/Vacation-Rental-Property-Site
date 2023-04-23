use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use aws_sdk_dynamodb::model::AttributeValue;
use dynamodb::model::{KeysAndAttributes, ReturnConsumedCapacity};
use lambda_http::{aws_lambda_events::query_map::QueryMap, http::StatusCode, Body, Error};
use serde::{Deserialize, Serialize};
use serde_dynamo::from_items;
use std::{collections::HashMap, env};

pub async fn batch_get_item<'a, T: Deserialize<'a> + Serialize>(
    client: &dynamodb::Client,
    item_keys: Vec<(AttributeValue, AttributeValue)>,
) -> Result<Vec<T>, (StatusCode, String)> {
    let mut keys_and_attributes_builder = KeysAndAttributes::builder();

    for (primary_key, sort_key) in item_keys {
        keys_and_attributes_builder = keys_and_attributes_builder.keys(HashMap::from([
            ("PK".into(), primary_key),
            ("SK".into(), sort_key),
        ]))
    }

    let keys_and_attributes = keys_and_attributes_builder.build();

    let result = match client
        .batch_get_item()
        .request_items(
            env::var("TABLE_NAME").unwrap().to_string(),
            keys_and_attributes,
        )
        .return_consumed_capacity(ReturnConsumedCapacity::Indexes)
        .send()
        .await
    {
        Ok(result) => result,
        Err(error) => {
            return Err((StatusCode::INTERNAL_SERVER_ERROR, error.to_string()));
        }
    };

    let tables_and_items = match result.responses() {
        Some(items) => items,
        None => return Err((StatusCode::NOT_FOUND, serde_json::json!([]).to_string())),
    };

    let items = match tables_and_items.get(&env::var("TABLE_NAME").unwrap()) {
        Some(items) => items,
        None => return Err((StatusCode::OK, serde_json::json!([]).to_string())),
    };

    let entities: Vec<T> = match from_items(items.clone()) {
        Ok(entities) => entities,
        Err(error) => {
            println!(
                "Error converting DynamoDB items: {:?} into known type.",
                items
            );
            return Err((StatusCode::INTERNAL_SERVER_ERROR, error.to_string()));
        }
    };

    Ok(entities)
}

pub async fn batch_get_item_http<'a, T: Deserialize<'a> + Serialize>(
    client: &dynamodb::Client,
    querymap: QueryMap,
    item_keys: Vec<(AttributeValue, AttributeValue)>,
) -> Result<lambda_http::Response<Body>, Error> {
    match batch_get_item::<T>(client, item_keys).await {
        Ok(typed_entities) => utils::http::send_response(
            types::http::ApiResponseData::Multiple(typed_entities),
            Some(querymap),
            None,
            None,
        ),
        Err((status_code, message)) => utils::http::send_error(status_code, &message),
    }
}
