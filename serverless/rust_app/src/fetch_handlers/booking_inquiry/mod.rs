mod query_for_booking_inquiries_by_state;
use query_for_booking_inquiries_by_state::query_for_booking_inquiries_by_state;

mod query_for_booking_inquiries_in_date_range;
use query_for_booking_inquiries_in_date_range::query_for_booking_inquiries_in_date_range;

mod query_for_all_booking_inquiries;
use query_for_all_booking_inquiries::query_for_all_booking_inquiries;

use aws_sdk_dynamodb as dynamodb;
use lambda_http::{aws_lambda_events::query_map::QueryMap, Body, Error, Response};

pub async fn get(client: &dynamodb::Client, querymap: QueryMap) -> Result<Response<Body>, Error> {
    if let Some(state) = querymap.first("state") {
        return query_for_booking_inquiries_by_state(client, state, querymap.clone()).await;
    }

    let start_date = querymap.first("start_date");
    let end_date = querymap.first("end_date");

    if start_date.is_some() & end_date.is_some() {
        return query_for_booking_inquiries_in_date_range(
            client,
            (start_date.unwrap(), end_date.unwrap()),
            querymap.clone(),
        )
        .await;
    }

    query_for_all_booking_inquiries(client, querymap.clone()).await
}
