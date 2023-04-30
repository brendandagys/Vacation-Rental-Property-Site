use crate::{
    fetch_handlers::content::get_content_by_content_id,
    types::{self, BuildFunction, Buildable},
    utils::{self, dynamo_db::batch_write_item},
};

use aws_sdk_dynamodb as dynamodb;
use chrono::{DateTime, Utc};
use dynamodb::{
    operation::put_item::builders::PutItemFluentBuilder,
    types::{AttributeValue, PutRequest, WriteRequest},
};
use lambda_http::{Body, Error};

pub fn build_content_item<T: Buildable>(
    mut builder: T,
    content: types::content::FinalContentPutRequest,
    now: DateTime<Utc>,
) -> T {
    let types::content::FinalContentPutRequest {
        content_id,
        version,
        content_data,
    } = content;

    builder = builder
        .item("PK", AttributeValue::S("CONTENT".into()))
        .item("SK", AttributeValue::S(format!("{:?}", content_id)))
        .item("GSI-PK", AttributeValue::S("CONTENT".into()));

    match content_data {
        types::content::ContentData::Text(types::content::TextContent { language, value }) => {
            builder = builder.item(
                "GSI-SK",
                AttributeValue::S(format!("{:?}", types::content::ContentDataType::TEXT)),
            );
            builder = builder.item("content_id", AttributeValue::S(format!("{:?}", content_id)));
            builder = builder.item("version", AttributeValue::N(version.to_string()));
            builder = builder.item("language", AttributeValue::S(format!("{:?}", language)));
            builder = builder.item("value", AttributeValue::S(value));
        }
        types::content::ContentData::Image(types::content::ImageContent { url }) => {
            builder = builder.item(
                "GSI-SK",
                AttributeValue::S(format!("{:?}", types::content::ContentDataType::IMAGE)),
            );
            builder = builder.item("content_id", AttributeValue::S(format!("{:?}", content_id)));
            builder = builder.item("version", AttributeValue::N(version.to_string()));
            builder = builder.item("url", AttributeValue::S(url));
        }
    }

    builder.item("created", AttributeValue::S(now.to_string()))
}

struct BuildContent {}
impl BuildFunction<PutItemFluentBuilder, types::content::FinalContentPutRequest> for BuildContent {
    fn build_item(
        &self,
        builder: PutItemFluentBuilder,
        content_put_request: types::content::FinalContentPutRequest,
        now: DateTime<Utc>,
    ) -> PutItemFluentBuilder {
        build_content_item(builder, content_put_request, now)
    }
}

pub async fn put_content(
    client: &dynamodb::Client,
    content: types::content::ContentPutRequest,
) -> Result<lambda_http::Response<Body>, Error> {
    let content_builder = BuildContent {};

    let current_version = match get_content_by_content_id(client, &content.content_id).await {
        Ok(content) => content.version,
        Err(_) => 0,
    };

    utils::dynamo_db::put_item_http::<types::content::FinalContentPutRequest>(
        client,
        content_builder,
        types::content::FinalContentPutRequest {
            content_id: content.content_id,
            version: current_version + 1,
            content_data: content.content_data,
        },
    )
    .await
}

pub async fn put_contents(
    client: &dynamodb::Client,
    contents: Vec<types::content::ContentPutRequest>,
) -> Result<lambda_http::Response<Body>, Error> {
    let now = Utc::now();

    let mut write_requests = Vec::new();

    // Using `.map()` didn't work, even with `futures::future::join_all()`
    for content in contents {
        let put_request_builder = PutRequest::builder();

        let current_version = match get_content_by_content_id(client, &content.content_id).await {
            Ok(content) => content.version,
            Err(_) => 0,
        };

        write_requests.push(
            WriteRequest::builder()
                .put_request(
                    build_content_item(
                        put_request_builder,
                        types::content::FinalContentPutRequest {
                            content_id: content.content_id,
                            version: current_version + 1,
                            content_data: content.content_data,
                        },
                        now,
                    )
                    .build(),
                )
                .build(),
        )
    }

    batch_write_item(client, write_requests).await
}
