use crate::{
    types::{self, Buildable},
    utils::{self, dynamo_db::batch_write_item},
};

use aws_sdk_dynamodb as dynamodb;
use chrono::{DateTime, Utc};
use dynamodb::model::{AttributeValue, PutRequest, WriteRequest};
use lambda_http::{Body, Error};
use std::env;

pub fn build_content_item<T: Buildable>(
    mut builder: T,
    content: types::content::ContentPutRequest,
    now: DateTime<Utc>,
) -> T {
    let types::content::ContentPutRequest {
        content_id,
        version,
        content_data,
    } = content;

    builder = builder
        .item("PK", AttributeValue::S(format!("CONTENT-{:?}", content_id)))
        .item("SK", AttributeValue::S(version.to_string()))
        .item("GSI-PK", AttributeValue::S("CONTENT".into()));

    match content_data {
        types::content::ContentData::Text(types::content::TextContent { language, value }) => {
            builder = builder.item("GSI-SK", AttributeValue::S("TEXT".into()));
            builder = builder.item("content_id", AttributeValue::S(format!("{:?}", content_id)));
            builder = builder.item("version", AttributeValue::N(version.to_string()));
            builder = builder.item("language", AttributeValue::S(format!("{:?}", language)));
            builder = builder.item("value", AttributeValue::S(value));
        }
        types::content::ContentData::Image(types::content::ImageContent { url }) => {
            builder = builder.item("GSI-SK", AttributeValue::S("IMAGE".into()));
            builder = builder.item("content_id", AttributeValue::S(format!("{:?}", content_id)));
            builder = builder.item("version", AttributeValue::N(version.to_string()));
            builder = builder.item("url", AttributeValue::S(url));
        }
    }

    builder.item("created", AttributeValue::S(now.to_string()))
}

pub async fn put_content(
    client: &dynamodb::Client,
    content: types::content::ContentPutRequest,
) -> Result<lambda_http::Response<Body>, Error> {
    let mut builder = client
        .put_item()
        .table_name(env::var("TABLE_NAME").unwrap().to_string());

    let now = Utc::now();
    builder = build_content_item(builder, content, now);

    utils::dynamo_db::send_put_item_request(builder).await
}

pub async fn put_contents(
    client: &dynamodb::Client,
    contents: Vec<types::content::ContentPutRequest>,
) -> Result<lambda_http::Response<Body>, Error> {
    let now = Utc::now();

    let write_requests = contents
        .into_iter()
        .map(|content| {
            let put_request_builder = PutRequest::builder();

            WriteRequest::builder()
                .put_request(build_content_item(put_request_builder, content, now).build())
                .build()
        })
        .collect();

    batch_write_item(client, write_requests).await
}
