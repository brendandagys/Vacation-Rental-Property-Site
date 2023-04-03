use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use dynamodb::model::AttributeValue;
use lambda_http::aws_lambda_events::query_map::QueryMap;
use lambda_http::{http::StatusCode, Body, Error, Response};

pub async fn query_for_testimonials_in_stars_range(
    client: &dynamodb::Client,
    (inclusive_lower, inclusive_upper): (&str, &str),
    querymap: QueryMap,
) -> Result<Response<Body>, Error> {
    let from: f32 = match inclusive_lower.parse() {
        Ok(val) => val,
        Err(_) => {
            return Ok(utils::http::build_http_response(
                StatusCode::BAD_REQUEST,
                "Provide a number value for `from`.",
            ))
        }
    };

    let to: f32 = match inclusive_upper.parse() {
        Ok(val) => val,
        Err(_) => {
            return Ok(utils::http::build_http_response(
                StatusCode::BAD_REQUEST,
                "Provide a number value for `to`.",
            ))
        }
    };

    let valid_stars: [u8; 11] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    if !valid_stars.contains(&((from * 2.0) as u8)) | !valid_stars.contains(&((to * 2.0) as u8)) {
        return Ok(utils::http::build_http_response(
            StatusCode::BAD_REQUEST,
            "Provide a valid `Stars` value.",
        ));
    }

    utils::dynamo_db::query_http::<types::testimonial::Testimonial>(
        client,
        Some(types::Index::GSI1),
        "#key1 = :value1 AND #key2 BETWEEN :value2 AND :value3".to_string(),
        &[("#key1", "GSI-PK"), ("#key2", "GSI-SK")],
        vec![
            (":value1", AttributeValue::S("TESTIMONIAL".into())),
            (":value2", AttributeValue::S(format!("{from}"))),
            (":value3", AttributeValue::S(format!("{to}"))),
        ],
    )
    .await
}
