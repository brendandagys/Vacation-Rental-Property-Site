use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use chrono::Utc;
use dynamodb::model::AttributeValue;
use lambda_http::{http::StatusCode, Body, Error};
use std::env;

pub async fn put_testimonial(
    client: dynamodb::Client,
    testimonial: types::testimonial::TestimonialPutRequest,
) -> Result<lambda_http::Response<Body>, Error> {
    let types::testimonial::TestimonialPutRequest {
        email,
        stars,
        title,
        comment,
        active,
    } = testimonial;

    if email.trim() == "" || title.trim() == "" || comment.trim() == "" {
        return Ok(utils::http::build_http_response(
            StatusCode::BAD_REQUEST,
            "Please provide all fields.",
        ));
    }

    let stars_num = utils::miscellaneous::get_stars_number(stars);

    let now = Utc::now();

    let builder = client
        .put_item()
        .table_name(env::var("TABLE_NAME").unwrap().to_string())
        .item(
            "PK",
            AttributeValue::S(format!(
                "TESTIMONIAL-{}",
                if active { "ACTIVE" } else { "INACTIVE" }
            )),
        )
        .item("SK", AttributeValue::S(now.to_string()))
        .item("GSI-PK", AttributeValue::S("TESTIMONIAL".into()))
        .item("GSI-SK", AttributeValue::S(stars_num.to_string()))
        .item("email", AttributeValue::S(email))
        .item("stars", AttributeValue::N(stars_num.to_string()))
        .item("title", AttributeValue::S(title))
        .item("comment", AttributeValue::S(comment))
        .item("active", AttributeValue::Bool(active))
        .item("created", AttributeValue::S(now.to_string()));

    utils::dynamo_db::send_put_item_request(builder).await
}
