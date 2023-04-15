use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use chrono::Utc;
use dynamodb::{
    client::fluent_builders::PutItem, model::ReturnConsumedCapacity, output::PutItemOutput,
};
use lambda_http::{http::StatusCode, Body, Error};
use std::env;

pub async fn put_item<U>(
    client: &dynamodb::Client,
    item_builder: impl types::BuildFunction<PutItem, U>,
    entity: U,
) -> Result<PutItemOutput, (StatusCode, String)> {
    let mut builder = client
        .put_item()
        .table_name(env::var("TABLE_NAME").unwrap().to_string());

    let now = Utc::now();

    builder = item_builder.build_item(builder, entity, now);

    match builder
        .return_consumed_capacity(ReturnConsumedCapacity::Indexes)
        .send()
        .await
    {
        Ok(result) => Ok(result),
        Err(error) => Err((StatusCode::INTERNAL_SERVER_ERROR, error.to_string())),
    }
}

pub async fn put_item_http<U>(
    client: &dynamodb::Client,
    item_builder: impl types::BuildFunction<PutItem, U>,
    entity: U,
) -> Result<lambda_http::Response<Body>, Error> {
    match put_item(client, item_builder, entity).await {
        Ok(put_item_output) => utils::http::send_response(
            types::http::ApiResponseData::Single(format!("{:?}", put_item_output)),
            None,
            None,
        ),
        Err((status_code, message)) => utils::http::send_error(status_code, &message),
    }
}
