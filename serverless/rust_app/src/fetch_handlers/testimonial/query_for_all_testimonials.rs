use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use dynamodb::model::AttributeValue;
use lambda_http::{aws_lambda_events::query_map::QueryMap, Body, Error, Response};

pub async fn query_for_all_testimonials(
    client: &dynamodb::Client,
    querymap: QueryMap,
) -> Result<Response<Body>, Error> {
    utils::dynamo_db::query::<types::testimonial::Testimonial>(
        client,
        Some("GSI-1".to_string()),
        "#field = :value".to_string(),
        &[("#field", "GSI-PK")],
        vec![(":value", AttributeValue::S("TESTIMONIAL".into()))],
    )
    .await
}
