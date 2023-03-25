mod query_for_testimonials_by_active_and_date_range;
use query_for_testimonials_by_active_and_date_range::query_for_testimonials_by_active_and_date_range;

mod query_for_testimonials_by_active;
use query_for_testimonials_by_active::query_for_testimonials_by_active;

mod query_for_testimonials_in_stars_range;
use query_for_testimonials_in_stars_range::query_for_testimonials_in_stars_range;

mod query_for_all_testimonials;
use query_for_all_testimonials::query_for_all_testimonials;

use aws_sdk_dynamodb as dynamodb;
use lambda_http::{
    aws_lambda_events::query_map::QueryMap, http::StatusCode, Body, Error, Response,
};

use crate::utils;

pub async fn get(client: dynamodb::Client, querymap: QueryMap) -> Result<Response<Body>, Error> {
    let active = querymap.first("active");

    let start_date = querymap.first("start_date");
    let end_date = querymap.first("end_date");

    if active.is_some() {
        let bool_active = match active.unwrap_or("foo") {
            "true" => true,
            "false" => false,
            _ => {
                return Ok(utils::http::build_http_response(
                    StatusCode::BAD_REQUEST,
                    "Provide `true` or `false` for the `active` parameter.",
                ))
            }
        };

        if start_date.is_some() & end_date.is_some() {
            return query_for_testimonials_by_active_and_date_range(
                client,
                bool_active,
                (start_date.unwrap(), end_date.unwrap()),
                querymap.clone(),
            )
            .await;
        }

        return query_for_testimonials_by_active(client, bool_active, querymap).await;
    }

    let stars_start = querymap.first("stars_start");
    let stars_end = querymap.first("stars_end");

    if stars_start.is_some() & stars_end.is_some() {
        return query_for_testimonials_in_stars_range(
            client,
            (stars_start.unwrap(), stars_end.unwrap()),
            querymap.clone(),
        )
        .await;
    }

    query_for_all_testimonials(client, querymap.clone()).await
}
