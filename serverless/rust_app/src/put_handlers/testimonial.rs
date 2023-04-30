use crate::{
    types::{self, BuildFunction},
    utils,
};

use aws_sdk_dynamodb as dynamodb;
use chrono::{DateTime, Utc};
use dynamodb::{operation::put_item::builders::PutItemFluentBuilder, types::AttributeValue};
use lambda_http::{http::StatusCode, Body, Error};

pub fn build_testimonial_item(
    builder: PutItemFluentBuilder,
    testimonial: types::testimonial::TestimonialPutRequest,
    now: DateTime<Utc>,
) -> PutItemFluentBuilder {
    let types::testimonial::TestimonialPutRequest {
        email,
        stars,
        title,
        comment,
        active,
    } = testimonial;

    let stars_num = utils::miscellaneous::get_stars_number(stars);

    builder
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
        .item("created", AttributeValue::S(now.to_string()))
}

struct BuildTestimonial {}

impl BuildFunction<PutItemFluentBuilder, types::testimonial::TestimonialPutRequest>
    for BuildTestimonial
{
    fn build_item(
        &self,
        builder: PutItemFluentBuilder,
        testimonial_put_request: types::testimonial::TestimonialPutRequest,
        now: DateTime<Utc>,
    ) -> PutItemFluentBuilder {
        build_testimonial_item(builder, testimonial_put_request, now)
    }
}

pub async fn put_testimonial(
    client: &dynamodb::Client,
    testimonial: types::testimonial::TestimonialPutRequest,
) -> Result<lambda_http::Response<Body>, Error> {
    let types::testimonial::TestimonialPutRequest {
        email,
        title,
        comment,
        ..
    } = &testimonial;

    if email.trim() == "" || title.trim() == "" || comment.trim() == "" {
        return utils::http::send_error(StatusCode::BAD_REQUEST, "Please provide all fields.");
    }

    let testimonial_builder = BuildTestimonial {};

    utils::dynamo_db::put_item_http::<types::testimonial::TestimonialPutRequest>(
        client,
        testimonial_builder,
        testimonial,
    )
    .await
}
