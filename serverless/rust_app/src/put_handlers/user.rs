use crate::{types, utils};
use aws_sdk_dynamodb as dynamodb;
use chrono::Utc;
use dynamodb::model::AttributeValue;
use lambda_http::{http::StatusCode, Body, Error};
use std::env;

pub async fn put_user(
    user: types::user::UserPutRequest,
    client: dynamodb::Client,
) -> Result<lambda_http::Response<Body>, Error> {
    let types::user::UserPutRequest {
        username,
        email,
        password,
        first,
        last,
        administrator,
        phone,
    } = user;

    let no_whitespace_password = password.replace(" ", "");
    if no_whitespace_password.len() < 7 {
        return Ok(utils::http::build_http_response(
            StatusCode::BAD_REQUEST,
            "Password must be at least seven characters, with no whitespace.",
        ));
    }

    if username.trim() == ""
        || email.trim() == ""
        || no_whitespace_password == ""
        || first.trim() == ""
        || last.trim() == ""
        || phone.trim() == ""
    {
        return Ok(utils::http::build_http_response(
            StatusCode::BAD_REQUEST,
            "Please provide all fields.",
        ));
    }

    let hash = utils::authorization::hash_password(no_whitespace_password)?;

    let now = Utc::now();

    let builder = client
        .put_item()
        .table_name(env::var("TABLE_NAME").unwrap().to_string())
        .item("PK", AttributeValue::S(format!("USER-{username}")))
        .item("SK", AttributeValue::S("USER-INFO".into()))
        .item("GSI-PK", AttributeValue::S("USER".into()))
        .item("GSI-SK", AttributeValue::S(email.clone()))
        .item("username", AttributeValue::S(username))
        .item("email", AttributeValue::S(email))
        .item("hash", AttributeValue::S(hash))
        .item("first", AttributeValue::S(first))
        .item("last", AttributeValue::S(last))
        .item("administrator", AttributeValue::Bool(administrator))
        .item("phone", AttributeValue::S(phone));

    utils::dynamo_db::send_and_handle_put_item_request(builder, now).await
}
