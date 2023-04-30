use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use dynamodb::types::{AttributeValue, KeysAndAttributes, ReturnConsumedCapacity};
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

    let table_name = env::var("TABLE_NAME").unwrap().to_string();

    let keys_and_attributes = keys_and_attributes_builder.build();

    let result = match client
        .batch_get_item()
        .request_items(&table_name, keys_and_attributes)
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
        None => {
            return Err((
                StatusCode::INTERNAL_SERVER_ERROR,
                "No table data returned!".into(),
            ))
        }
    };

    let items = match tables_and_items.get(&table_name) {
        Some(items) => items,
        None => {
            return Err((
                StatusCode::INTERNAL_SERVER_ERROR,
                "Error obtaining DynamoDB items from result!".into(),
            ))
        }
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
    let limit = match querymap.first("limit") {
        Some(limit) => match limit.parse::<i32>() {
            Ok(limit) => Some(limit),
            Err(_) => None, // Improper limit => fetch all records
        },
        None => None,
    };

    match batch_get_item::<T>(client, item_keys).await {
        Ok(typed_entities) => {
            if typed_entities.len() == 0 {
                return utils::http::send_response(
                    types::http::ApiResponseData::NoneMultiple::<Vec<()>>(Vec::new()),
                    Some(querymap),
                    limit,
                    Some(StatusCode::NOT_FOUND),
                );
            }

            utils::http::send_response(
                types::http::ApiResponseData::Multiple(typed_entities),
                Some(querymap),
                None,
                None,
            )
        }
        Err((status_code, message)) => utils::http::send_error(status_code, &message),
    }
}
