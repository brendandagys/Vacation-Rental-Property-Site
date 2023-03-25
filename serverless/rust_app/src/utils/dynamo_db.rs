use crate::utils;
use aws_sdk_dynamodb as dynamodb;
use chrono::{DateTime, Utc};
use dynamodb::{
    client::fluent_builders::PutItem,
    model::{AttributeValue, KeysAndAttributes},
};
use lambda_http::{http::StatusCode, Body, Error, Response};
use serde::{Deserialize, Serialize};
use serde_dynamo::{from_item, from_items};
use std::{collections::HashMap, env};

pub async fn get_dynamo_db_client() -> dynamodb::Client {
    let config = aws_config::load_from_env().await;
    let local_config = dynamodb::config::Builder::from(&config)
        .endpoint_url(
            env::var("DYNAMODB_ENDPOINT").unwrap_or("http://docker.for.mac.localhost:8000".into()),
        )
        .build();

    dynamodb::Client::from_conf(local_config)
}

pub fn append_string_item_if_exists(
    builder: PutItem,
    attribute_key: &str,
    value: Option<String>,
) -> PutItem {
    match value {
        Some(value) => {
            let updated_builder = builder.item(attribute_key, AttributeValue::S(value));
            updated_builder
        }
        None => builder,
    }
}

pub fn append_u8_item_if_exists(
    builder: PutItem,
    attribute_key: &str,
    value: Option<u8>,
) -> PutItem {
    match value {
        Some(value) => {
            let updated_builder = builder.item(attribute_key, AttributeValue::N(value.to_string()));
            updated_builder
        }
        None => builder,
    }
}

pub async fn send_and_handle_put_item_request(
    builder: PutItem,
    now: DateTime<Utc>,
) -> Result<lambda_http::Response<Body>, Error> {
    match builder
        .item("created", AttributeValue::S(now.to_string()))
        .send()
        .await
    {
        Ok(result) => Ok(utils::http::build_http_response(
            StatusCode::OK,
            &format!("PUT result: {:?}", result),
        )),
        Err(error) => Ok(utils::http::build_http_response(
            StatusCode::INTERNAL_SERVER_ERROR,
            &error.to_string(),
        )),
    }
}

pub async fn get_item<'a, T: Deserialize<'a> + Serialize>(
    client: dynamodb::Client,
    primary_key: AttributeValue,
    sort_key: AttributeValue,
) -> Result<Response<Body>, Error> {
    let result = match client
        .get_item()
        .table_name(env::var("TABLE_NAME").unwrap().to_string())
        .key("PK", primary_key)
        .key("SK", sort_key)
        .send()
        .await
    {
        Ok(result) => result,
        Err(error) => {
            println!("ERROR: {error}");
            return Ok(utils::http::build_http_response(
                StatusCode::INTERNAL_SERVER_ERROR,
                &error.to_string(),
            ));
        }
    };

    let dynamodb_item = match result.item() {
        Some(item) => item,
        None => {
            return Ok(utils::http::build_http_response(
                StatusCode::OK,
                &serde_json::json!(null).to_string(),
            ))
        }
    }
    .clone();

    let typed_item: T = match from_item(dynamodb_item.clone()) {
        Ok(item) => item,
        Err(error) => {
            println!(
                "Error converting DynamoDB item: {:?} into known type.",
                dynamodb_item
            );
            return Ok(utils::http::build_http_response(
                StatusCode::INTERNAL_SERVER_ERROR,
                &error.to_string(),
            ));
        }
    };

    match serde_json::to_string(&typed_item) {
        Ok(string) => Ok(utils::http::build_http_response(StatusCode::OK, &string)),

        Err(error) => {
            println!("ERROR2: {error}");

            Ok(utils::http::build_http_response(
                StatusCode::INTERNAL_SERVER_ERROR,
                &error.to_string(),
            ))
        }
    }
}

pub async fn batch_get_item<'a, T: Deserialize<'a> + Serialize>(
    client: dynamodb::Client,
    item_keys: Vec<(AttributeValue, AttributeValue)>,
) -> Result<Response<Body>, Error> {
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

    let tables_and_items = match result.responses() {
        Some(items) => items,
        None => {
            return Ok(utils::http::build_http_response(
                StatusCode::OK,
                &serde_json::json!([]).to_string(),
            ))
        }
    };

    let items = match tables_and_items.get(&env::var("TABLE_NAME").unwrap()) {
        Some(items) => items,
        None => {
            return Ok(utils::http::build_http_response(
                StatusCode::OK,
                &serde_json::json!([]).to_string(),
            ))
        }
    };

    let entities: Vec<T> = match from_items(items.clone()) {
        Ok(entities) => entities,
        Err(error) => {
            println!("Error converting items: {:?}.", items);
            return Ok(utils::http::build_http_response(
                StatusCode::INTERNAL_SERVER_ERROR,
                &error.to_string(),
            ));
        }
    };

    match serde_json::to_string(&entities) {
        Ok(string) => Ok(utils::http::build_http_response(StatusCode::OK, &string)),
        Err(error) => Ok(utils::http::build_http_response(
            StatusCode::INTERNAL_SERVER_ERROR,
            &error.to_string(),
        )),
    }
}

pub async fn query<'a, T: Deserialize<'a> + Serialize>(
    client: dynamodb::Client,
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
    let result = match builder.send().await {
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
                StatusCode::OK,
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
            println!("Error converting items: {:?}.", items);
            return Ok(utils::http::build_http_response(
                StatusCode::INTERNAL_SERVER_ERROR,
                &error.to_string(),
            ));
        }
    };

    // Serialize to string
    match serde_json::to_string(&entities) {
        Ok(string) => Ok(utils::http::build_http_response(StatusCode::OK, &string)),
        Err(error) => Ok(utils::http::build_http_response(
            StatusCode::INTERNAL_SERVER_ERROR,
            &error.to_string(),
        )),
    }
}
