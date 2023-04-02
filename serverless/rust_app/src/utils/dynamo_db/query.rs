use super::serialize_fetch_response;
use crate::utils;

use aws_sdk_dynamodb as dynamodb;
use aws_sdk_dynamodb::model::AttributeValue;
use dynamodb::model::ReturnConsumedCapacity;
use lambda_http::{http::StatusCode, Body, Error, Response};
use serde::{Deserialize, Serialize};
use serde_dynamo::from_items;
use std::env;

pub async fn query<'a, T: Deserialize<'a> + Serialize + std::fmt::Debug>(
    client: &dynamodb::Client,
    index_name: Option<String>,
    key_condition_expression: String,
    expression_attribute_names: &[(&str, &str)],
    expression_attribute_values: Vec<(&str, AttributeValue)>,
) -> Result<Response<Body>, Error> {
    let mut builder = client
        .query()
        .table_name(env::var("TABLE_NAME").unwrap().to_string());

    if let Some(index_name) = index_name {
        builder = builder.index_name(index_name);
    }

    builder = builder.key_condition_expression(&key_condition_expression);

    for (key, value) in expression_attribute_names.to_vec() {
        builder = builder.expression_attribute_names(key, value);
    }

    for (key, value) in expression_attribute_values {
        builder = builder.expression_attribute_values(key, value);
    }

    // Send the query to DynamoDB
    let result = match builder
        .return_consumed_capacity(ReturnConsumedCapacity::Indexes)
        .send()
        .await
    {
        Ok(result) => result,
        Err(error) => {
            return Ok(utils::http::build_http_response(
                StatusCode::INTERNAL_SERVER_ERROR,
                &error.to_string(),
            ));
        }
    };

    // Get results, if any, from the response from DynamoDB
    let items = match result.items() {
        Some(items) => items,
        None => {
            return Ok(utils::http::build_http_response(
                StatusCode::NOT_FOUND,
                &serde_json::json!(format!(
                    "{}",
                    if key_condition_expression.contains(" = :") {
                        "null"
                    } else {
                        "[]"
                    }
                ))
                .to_string(),
            ))
        }
    }
    .clone()
    .to_vec();

    // Get typed entities, derived from the DynamoDB response
    let entities: Vec<T> = match from_items(items.clone()) {
        Ok(entities) => entities,
        Err(error) => {
            println!(
                "Error converting DynamoDB items: {:?} into known type.",
                items
            );
            return Ok(utils::http::build_http_response(
                StatusCode::INTERNAL_SERVER_ERROR,
                &error.to_string(),
            ));
        }
    };

    serialize_fetch_response(entities)
}
