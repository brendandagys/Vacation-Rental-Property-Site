use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use dynamodb::model::AttributeValue;
use lambda_http::{aws_lambda_events::query_map::QueryMap, Body, Error, Response};

pub async fn query_for_all_booking_inquiries(
    client: &dynamodb::Client,
    querymap: QueryMap,
) -> Result<Response<Body>, Error> {
    utils::dynamo_db::query_http::<types::booking_inquiry::BookingInquiry>(
        client,
        querymap,
        None,
        "#field = :value".to_string(),
        &[("#field", "PK")],
        vec![(":value", AttributeValue::S("INQUIRY".into()))],
    )
    .await
}
