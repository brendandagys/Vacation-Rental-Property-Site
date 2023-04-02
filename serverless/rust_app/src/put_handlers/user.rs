use crate::{
    types::{self, BuildFunction},
    utils,
};

use aws_sdk_dynamodb as dynamodb;
use chrono::{DateTime, Utc};
use dynamodb::{client::fluent_builders::PutItem, model::AttributeValue};
use lambda_http::{http::StatusCode, Body, Error};

pub fn build_user_item(
    builder: PutItem,
    user: types::user::UserPutRequest,
    now: DateTime<Utc>,
) -> PutItem {
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

    let hash = utils::authorization::hash_password(no_whitespace_password).unwrap();

    builder
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
        .item("phone", AttributeValue::S(phone))
        .item("created", AttributeValue::S(now.to_string()))
}

struct BuildUser {}

impl BuildFunction<PutItem, types::user::UserPutRequest> for BuildUser {
    fn build_item(
        &self,
        builder: PutItem,
        user_put_request: types::user::UserPutRequest,
        now: DateTime<Utc>,
    ) -> PutItem {
        build_user_item(builder, user_put_request, now)
    }
}

pub async fn put_user(
    client: &dynamodb::Client,
    user: types::user::UserPutRequest,
) -> Result<lambda_http::Response<Body>, Error> {
    let types::user::UserPutRequest {
        username,
        email,
        password,
        first,
        last,
        phone,
        ..
    } = &user;

    let no_whitespace_password = password.replace(" ", "");

    if no_whitespace_password.len() < 7 {
        return Ok(utils::http::build_http_response(
            StatusCode::BAD_REQUEST,
            "Password must be at least seven characters, with no whitespace.",
        ));
    }

    match utils::authorization::hash_password(no_whitespace_password.clone()) {
        Ok(_) => {}
        Err(error) => {
            return Ok(utils::http::build_http_response(
                StatusCode::BAD_REQUEST,
                &format!("Unable to hash provided password. ERROR: {error}"),
            ))
        }
    };

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

    let user_builder = BuildUser {};

    utils::dynamo_db::put_item_http::<types::user::UserPutRequest>(client, user_builder, user).await
}
