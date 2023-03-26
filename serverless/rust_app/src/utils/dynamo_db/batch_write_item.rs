use crate::utils;

use aws_sdk_dynamodb as dynamodb;
use dynamodb::model::WriteRequest;
use lambda_http::{http::StatusCode, Body, Error};
use std::env;

pub async fn batch_write_item(
    client: dynamodb::Client,
    write_requests: Vec<WriteRequest>,
) -> Result<lambda_http::Response<Body>, Error> {
    match client
        .batch_write_item()
        .request_items(env::var("TABLE_NAME").unwrap().to_string(), write_requests)
        .send()
        .await
    {
        Ok(result) => Ok(utils::http::build_http_response(
            StatusCode::OK,
            &format!("{:?}", result),
        )),
        Err(error) => {
            println!("Error performing batch write: {error}");
            Ok(utils::http::build_http_response(
                StatusCode::INTERNAL_SERVER_ERROR,
                &error.to_string(),
            ))
        }
    }
}
