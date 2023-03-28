use crate::{
    types::{self, Buildable},
    utils::{self, dynamo_db::batch_write_item},
};

use aws_sdk_dynamodb as dynamodb;
use chrono::{DateTime, Utc};
use dynamodb::model::{AttributeValue, PutRequest, WriteRequest};
use lambda_http::{Body, Error};
use std::env;

pub fn build_default_item<T: Buildable>(
    builder: T,
    default: types::default::DefaultPutRequest,
    now: DateTime<Utc>,
) -> T {
    let types::default::DefaultPutRequest { default_for, value } = default;

    builder
        .item("PK", AttributeValue::S("DEFAULT".into()))
        .item("SK", AttributeValue::S(format!("{:?}", default_for)))
        .item("GSI-PK", AttributeValue::S("DEFAULT".into()))
        .item("GSI-SK", AttributeValue::S(now.to_string()))
        .item(
            "default_for",
            AttributeValue::S(format!("{:?}", default_for)),
        )
        .item("value", AttributeValue::S(value))
        .item("created", AttributeValue::S(now.to_string()))
}

pub async fn put_default(
    client: &dynamodb::Client,
    default: types::default::DefaultPutRequest,
) -> Result<lambda_http::Response<Body>, Error> {
    let mut builder = client
        .put_item()
        .table_name(env::var("TABLE_NAME").unwrap().to_string());

    let now = Utc::now();
    builder = build_default_item(builder, default, now);

    utils::dynamo_db::send_put_item_request(builder).await
}

pub async fn put_defaults(
    client: &dynamodb::Client,
    defaults: Vec<types::default::DefaultPutRequest>,
) -> Result<lambda_http::Response<Body>, Error> {
    let now = Utc::now();

    let write_requests = defaults
        .into_iter()
        .map(|default| {
            let put_request_builder = PutRequest::builder();

            WriteRequest::builder()
                .put_request(build_default_item(put_request_builder, default, now).build())
                .build()
        })
        .collect();

    batch_write_item(client, write_requests).await
}
