use std::env;

use aws_sdk_dynamodb as dynamodb;
use dynamodb::{operation::put_item::builders::PutItemFluentBuilder, types::AttributeValue};

mod batch_get_item;
pub use batch_get_item::{batch_get_item, batch_get_item_http};

mod batch_write_item;
pub use batch_write_item::batch_write_item;

mod get_item;
pub use get_item::{get_item, get_item_http};

mod put_item;
pub use put_item::{put_item, put_item_http};

mod query;
pub use query::{query, query_http};

const DYNAMODB_LOCAL: &str = "http://docker.for.mac.localhost:8000";

pub async fn get_dynamo_db_client() -> dynamodb::Client {
    let endpoint_url = match env::var("DYNAMODB_ENDPOINT") {
        Ok(endpoint) => {
            if endpoint == "" {
                DYNAMODB_LOCAL.into()
            } else {
                endpoint
            }
        }
        Err(_) => DYNAMODB_LOCAL.into(),
    };

    println!("DynamoDB endpoint: {}", endpoint_url);

    let config = aws_config::load_from_env().await;
    let local_config = dynamodb::config::Builder::from(&config)
        .endpoint_url(endpoint_url)
        .build();

    dynamodb::Client::from_conf(local_config)
}

pub fn append_string_item_if_exists(
    builder: PutItemFluentBuilder,
    attribute_key: &str,
    value: Option<String>,
) -> PutItemFluentBuilder {
    match value {
        Some(value) => {
            let updated_builder = builder.item(attribute_key, AttributeValue::S(value));
            updated_builder
        }
        None => builder,
    }
}

pub fn append_u8_item_if_exists(
    builder: PutItemFluentBuilder,
    attribute_key: &str,
    value: Option<u8>,
) -> PutItemFluentBuilder {
    match value {
        Some(value) => {
            let updated_builder = builder.item(attribute_key, AttributeValue::N(value.to_string()));
            updated_builder
        }
        None => builder,
    }
}
