use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use dynamodb::model::AttributeValue;
use lambda_http::{aws_lambda_events::query_map::QueryMap, Body, Error, Response};

pub async fn query_for_booking_inquiries_by_state(
    client: &dynamodb::Client,
    state: &str,
    querymap: QueryMap,
) -> Result<Response<Body>, Error> {
    utils::dynamo_db::query_http::<types::booking_inquiry::BookingInquiry>(
        client,
        querymap,
        Some(types::Index::GSI1),
        "#key1 = :value1 AND #key2 = :value2".to_string(),
        &[("#key1", "GSI-PK"), ("#key2", "GSI-SK")],
        vec![
            (":value1", AttributeValue::S("INQUIRY".into())),
            (":value2", AttributeValue::S(format!("{state}"))),
        ],
        false,
    )
    .await
}
