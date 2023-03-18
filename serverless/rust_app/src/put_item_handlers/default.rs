use crate::{types, utils};
use aws_sdk_dynamodb as dynamodb;
use chrono::Utc;
use dynamodb::model::AttributeValue;
use lambda_http::{Body, Error};
use std::env;

pub async fn put_default(
    default: types::default::DefaultPutRequest,
    client: dynamodb::Client,
) -> Result<lambda_http::Response<Body>, Error> {
    let types::default::DefaultPutRequest { default_for, value } = default;

    let now = Utc::now();

    let builder = client
        .put_item()
        .table_name(env::var("TABLE_NAME").unwrap().to_string())
        .item("PK", AttributeValue::S("DEFAULT".into()))
        .item("SK", AttributeValue::S(format!("{:?}", default_for)))
        .item("GSI-PK", AttributeValue::S("DEFAULT".into()))
        .item("GSI-SK", AttributeValue::S(now.to_string()))
        .item(
            "default_for",
            AttributeValue::S(format!("{:?}", default_for)),
        )
        .item("value", AttributeValue::S(value));

    utils::send_and_handle_put_item_request(builder, now).await
}
