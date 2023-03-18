use crate::{types::testimonial::Stars, utils};

use aws_sdk_dynamodb as dynamodb;
use bcrypt::{BcryptResult, DEFAULT_COST};
use chrono::{DateTime, Utc};
use dynamodb::{client::fluent_builders::PutItem, model::AttributeValue};
use lambda_http::{self, http::StatusCode, Body, Error};
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
        Ok(result) => Ok(utils::build_http_response(
            StatusCode::OK,
            &format!("PUT `BookingInquiry` result: {:?}", result),
        )),
        Err(error) => Ok(utils::build_http_response(
            StatusCode::INTERNAL_SERVER_ERROR,
            &error.to_string(),
        )),
    }
}

pub fn build_http_response(
    status_code: lambda_http::http::StatusCode,
    body_text: &str,
) -> lambda_http::Response<lambda_http::Body> {
    let body = lambda_http::Body::Text(body_text.into());
    match lambda_http::Response::builder()
        .status(status_code)
        .body(body)
    {
        Ok(response) => response,
        Err(error) => lambda_http::Response::builder()
            .status(lambda_http::http::StatusCode::INTERNAL_SERVER_ERROR)
            .body(lambda_http::Body::Text(format!("{error}")))
            .unwrap(),
    }
}

pub fn hash_password(password: String) -> BcryptResult<String> {
    let salt = env::var("AUTHORIZATION_HASH_SALT").unwrap();
    let salt_characters: Vec<u8> = salt.bytes().collect();

    if salt_characters.len() < 16 {
        return Err(bcrypt::BcryptError::InvalidSaltLen(salt_characters.len()));
    }

    let mut default_array: [u8; 16] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6];

    for (i, _) in default_array.clone().iter().enumerate() {
        default_array[i] = salt_characters[i];
    }

    match bcrypt::hash_with_salt(password, DEFAULT_COST, default_array) {
        Ok(hash) => Ok(hash.format_for_version(bcrypt::Version::TwoB)),
        Err(error) => Err(error),
    }
}

pub fn get_stars_number(stars: Stars) -> f32 {
    match stars {
        Stars::Zero => 0.0,
        Stars::Half => 0.5,
        Stars::One => 1.0,
        Stars::OneAndAHalf => 1.5,
        Stars::Two => 2.0,
        Stars::TwoAndAHalf => 2.5,
        Stars::Three => 3.0,
        Stars::ThreeAndAHalf => 3.5,
        Stars::Four => 4.0,
        Stars::FourAndAHalf => 4.5,
        Stars::Five => 5.0,
    }
}
