mod batch_get_item;
pub use batch_get_item::batch_get_item;

mod batch_write_item;
pub use batch_write_item::batch_write_item;

mod get_item;
pub use get_item::{get_item, get_item_http};

mod query;
pub use query::query;

use crate::utils;

use aws_sdk_dynamodb as dynamodb;
use dynamodb::{
    client::fluent_builders::PutItem,
    model::{AttributeValue, ReturnConsumedCapacity},
};
use lambda_http::{http::StatusCode, Body, Error, Response};
use std::env;

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

pub async fn send_put_item_request(builder: PutItem) -> Result<lambda_http::Response<Body>, Error> {
    match builder
        .return_consumed_capacity(ReturnConsumedCapacity::Indexes)
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

fn serialize_fetch_response<T: serde::Serialize>(data: T) -> Result<Response<Body>, Error> {
    match serde_json::to_string(&data) {
        Ok(string) => Ok(utils::http::build_http_response(StatusCode::OK, &string)),
        Err(error) => {
            println!("Error converting response data into a JSON string: {error}");
            Ok(utils::http::build_http_response(
                StatusCode::INTERNAL_SERVER_ERROR,
                &error.to_string(),
            ))
        }
    }
}
