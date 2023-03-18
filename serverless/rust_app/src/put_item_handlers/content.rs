use crate::{types, utils};
use aws_sdk_dynamodb as dynamodb;
use chrono::Utc;
use dynamodb::model::AttributeValue;
use lambda_http::{Body, Error};
use std::env;

pub async fn put_content(
    content: types::content::ContentPutRequest,
    client: dynamodb::Client,
) -> Result<lambda_http::Response<Body>, Error> {
    let types::content::ContentPutRequest {
        content_id,
        version,
        content_data,
    } = content;

    let now = Utc::now();

    let mut builder = client
        .put_item()
        .table_name(env::var("TABLE_NAME").unwrap().to_string())
        .item("PK", AttributeValue::S(format!("CONTENT-{:?}", content_id)))
        .item("SK", AttributeValue::S(version.to_string()))
        .item("GSI-PK", AttributeValue::S("CONTENT".into()));

    match content_data {
        types::content::ContentData::Text(types::content::TextContent { language, value }) => {
            builder = builder.item("GSI-SK", AttributeValue::S(format!("{:?}", language)));
            builder = builder.item("content_id", AttributeValue::S(format!("{:?}", content_id)));
            builder = builder.item("version", AttributeValue::N(version.to_string()));
            builder = builder.item("language", AttributeValue::S(format!("{:?}", language)));
            builder = builder.item("value", AttributeValue::S(value));
        }
        types::content::ContentData::Image(types::content::ImageContent { url }) => {
            builder = builder.item("content_id", AttributeValue::S(format!("{:?}", content_id)));
            builder = builder.item("version", AttributeValue::N(version.to_string()));
            builder = builder.item("url", AttributeValue::S(url));
        }
    }

    utils::send_and_handle_put_item_request(builder, now).await
}
