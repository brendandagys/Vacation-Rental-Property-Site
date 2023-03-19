use crate::utils;
use aws_sdk_dynamodb as dynamodb;
use chrono::{DateTime, Utc};
use dynamodb::{client::fluent_builders::PutItem, model::AttributeValue};
use lambda_http::{http::StatusCode, Body, Error};
use std::env;

pub async fn get_dynamo_db_client() -> dynamodb::Client {
    println!("{:?}", env::var("DYNAMODB_ENDPOINT"));

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
            &format!("PUT `BookingInquiry` result: {:?}", result),
        )),
        Err(error) => Ok(utils::http::build_http_response(
            StatusCode::INTERNAL_SERVER_ERROR,
            &error.to_string(),
        )),
    }
}
