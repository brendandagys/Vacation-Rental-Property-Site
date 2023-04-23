use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use dynamodb::model::{ReturnConsumedCapacity, WriteRequest};
use lambda_http::{http::StatusCode, Body, Error};
use std::env;

pub async fn batch_write_item(
    client: &dynamodb::Client,
    write_requests: Vec<WriteRequest>,
) -> Result<lambda_http::Response<Body>, Error> {
    match client
        .batch_write_item()
        .request_items(env::var("TABLE_NAME").unwrap().to_string(), write_requests)
        .return_consumed_capacity(ReturnConsumedCapacity::Indexes)
        .send()
        .await
    {
        Ok(batch_write_item_output) => utils::http::send_response(
            types::http::ApiResponseData::Single(format!("{:?}", batch_write_item_output)),
            None,
            None,
            None,
        ),
        Err(error) => {
            println!("Error performing batch write: {error}");
            utils::http::send_error(StatusCode::INTERNAL_SERVER_ERROR, &error.to_string())
        }
    }
}
