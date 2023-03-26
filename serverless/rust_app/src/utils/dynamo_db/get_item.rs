use super::serialize_fetch_response;
use crate::utils;

use aws_sdk_dynamodb as dynamodb;
use aws_sdk_dynamodb::model::AttributeValue;
use lambda_http::{http::StatusCode, Body, Error, Response};
use serde::{Deserialize, Serialize};
use serde_dynamo::from_item;
use std::env;

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

    serialize_fetch_response(typed_item)
}
