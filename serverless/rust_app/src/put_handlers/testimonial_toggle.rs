use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use chrono::Utc;
use dynamodb::types::AttributeValue;
use lambda_http::{http::StatusCode, Body, Error};
use std::env;

// Toggle a testimonial's `active` flag by rewriting it under the appropriate PK and updating fields.
pub async fn toggle_testimonial_active(
    client: &dynamodb::Client,
    toggle: types::testimonial::TestimonialToggleRequest,
) -> Result<lambda_http::Response<Body>, Error> {
    let table_name = env::var("TABLE_NAME").unwrap_or_default();

    if table_name.is_empty() {
        return utils::http::send_error(
            StatusCode::INTERNAL_SERVER_ERROR,
            "TABLE_NAME not configured",
        );
    }

    let pk = toggle.primary_key.clone();
    let sk = toggle.sort_key.clone();

    // Fetch existing item first
    let existing = match utils::dynamo_db::get_item::<types::testimonial::Testimonial>(
        client,
        AttributeValue::S(pk.clone()),
        AttributeValue::S(sk.clone()),
    )
    .await
    {
        Ok(item) => item,
        Err((status, msg)) => return utils::http::send_error(status, &msg),
    };

    let new_active = toggle.active;
    let now = Utc::now().to_string();

    // Write a new item with updated PK and fields (idempotent)
    let target_pk = format!(
        "TESTIMONIAL-{}",
        if new_active { "ACTIVE" } else { "INACTIVE" }
    );

    let stars_num = existing.stars;

    // Put new version
    let put_res = client
        .put_item()
        .table_name(table_name.clone())
        .item("PK", AttributeValue::S(target_pk.clone()))
        .item("SK", AttributeValue::S(existing.sort_key.clone()))
        .item("GSI-PK", AttributeValue::S("TESTIMONIAL".into()))
        .item("GSI-SK", AttributeValue::S(stars_num.to_string()))
        .item(
            "name",
            AttributeValue::S(existing.name.unwrap_or_else(|| "Guest".into())),
        )
        .item("stars", AttributeValue::N(stars_num.to_string()))
        .item("title", AttributeValue::S(existing.title.clone()))
        .item("comment", AttributeValue::S(existing.comment.clone()))
        .item("active", AttributeValue::Bool(new_active))
        .item("created", AttributeValue::S(existing.created.clone()))
        .item("modified", AttributeValue::S(now))
        .send()
        .await;

    if let Err(err) = put_res {
        return utils::http::send_error(StatusCode::INTERNAL_SERVER_ERROR, &err.to_string());
    }

    // Delete old item if PK changed
    if pk != target_pk {
        let _ = client
            .delete_item()
            .table_name(table_name)
            .key("PK", AttributeValue::S(pk))
            .key("SK", AttributeValue::S(sk))
            .send()
            .await;
    }

    utils::http::send_response(
        types::http::ApiResponseData::Single("OK".to_string()),
        None,
        None,
        None,
    )
}
