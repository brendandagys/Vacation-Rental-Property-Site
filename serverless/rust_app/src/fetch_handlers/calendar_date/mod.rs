mod batch_get_calendar_dates;
use std::collections::HashSet;

use batch_get_calendar_dates::batch_get_calendar_dates;

mod query_for_calendar_dates_by_state;
use chrono::Utc;
use query_for_calendar_dates_by_state::query_for_calendar_dates_by_state;

mod query_for_calendar_dates_in_date_range;
use query_for_calendar_dates_in_date_range::query_for_calendar_dates_in_date_range;

use super::default::batch_get_defaults;
use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use lambda_http::{
    aws_lambda_events::query_map::QueryMap, http::StatusCode, Body, Error, Response,
};

pub async fn get(client: &dynamodb::Client, querymap: QueryMap) -> Result<Response<Body>, Error> {
    if let Some(dates) = querymap.all("dates") {
        return batch_get_calendar_dates(
            client,
            utils::str_vec_to_string_vec(dates),
            querymap.clone(),
        )
        .await;
    }

    if let Some(state) = querymap.first("state") {
        return query_for_calendar_dates_by_state(client, state, querymap.clone()).await;
    }

    let start_date = querymap.first("start_date");
    let end_date = querymap.first("end_date");

    if start_date.is_some() & end_date.is_some() {
        return query_for_calendar_dates_in_date_range(
            client,
            (start_date.unwrap(), end_date.unwrap()),
            querymap.clone(),
        )
        .await;
    }

    return Ok(utils::http::build_http_response(
        StatusCode::BAD_REQUEST,
        "Invalid parameters provided to fetch `CalendarDate`.",
    ));
}

async fn get_month_defaults(
    client: &dynamodb::Client,
    mut months: Vec<&str>,
) -> Result<Vec<types::default::Default>, (StatusCode, String)> {
    months.sort();
    months.dedup();

    const VALID_MONTHS: [&str; 12] = [
        "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",
    ];

    if months.iter().any(|month| !VALID_MONTHS.contains(&month)) {
        return Err((StatusCode::BAD_REQUEST, "Invalid YMDs provided.".into()));
    }

    let defaults_to_fetch = months
        .into_iter()
        .map(|month| match types::default::DefaultFor::try_from(month) {
            Ok(default) => Ok(default),
            Err(message) => Err((StatusCode::BAD_REQUEST, message)),
        })
        .collect::<Result<Vec<_>, (StatusCode, String)>>()?;

    Ok(batch_get_defaults(client, defaults_to_fetch).await?)
}

async fn get_missing_calendar_dates(
    client: &dynamodb::Client,
    mut found_dates: Vec<types::calendar_date::CalendarDate>,
    fetched_dates: Vec<String>,
) -> Result<Vec<types::calendar_date::CalendarDate>, (StatusCode, String)> {
    // Get YMDs from found calendar dates
    let found_dates_ymd_set: HashSet<String> =
        found_dates.iter().map(|date| date.ymd.clone()).collect();

    let fetched_dates_ymd_set: HashSet<String> = fetched_dates.into_iter().collect();

    // Find requested YMDs that aren't in found calendar dates
    let unfound_fetched_dates_ymd: Vec<String> = fetched_dates_ymd_set
        .difference(&found_dates_ymd_set)
        .map(|ymd| ymd.clone())
        .collect();

    // Get distinct months (2 digits)
    let unfound_months: Vec<&str> = unfound_fetched_dates_ymd
        .iter()
        .map(|ymd| &ymd[5..7])
        .collect();

    // Get defaults for distinct months
    let month_price_defaults = get_month_defaults(client, unfound_months).await?;

    // Create calendar dates for unfound YMDs
    let mut created_calendar_dates_from_defaults = unfound_fetched_dates_ymd
        .iter()
        .map(|ymd| {
            let utils::YmdParts { year, month, date } = match utils::get_parts_from_ymd(&ymd) {
                Ok(parts) => parts,
                Err(error) => {
                    return Err((
                        StatusCode::BAD_REQUEST,
                        format!("Invalid YMDs provided. Format is YYYY-MM-DD. ERROR: {error}"),
                    ))
                }
            };

            if !(1..13).contains(&month) {
                return Err((
                    StatusCode::BAD_REQUEST,
                    "Month must be between `01` and `12`.".to_string(),
                ));
            }

            let month_price_default_to_use = match types::default::DefaultFor::try_from(month) {
                Ok(default) => default,
                Err(message) => return Err((StatusCode::BAD_REQUEST, message)),
            };

            let price = match &month_price_defaults
                .iter()
                .find(|&default| default.default_for == month_price_default_to_use)
            {
                Some(default) => default.value.clone(),
                None => types::default::DEFAULT_PRICE.into(),
            };

            Ok(types::calendar_date::CalendarDate::new(
                ymd.into(),
                Some(types::calendar_date::DateState::Available),
                price.parse::<u16>().unwrap(),
                year,
                month,
                date,
                None,
                Utc::now().to_string(),
            ))
        })
        .collect::<Result<Vec<_>, _>>()?;

    // Append to result
    found_dates.append(&mut created_calendar_dates_from_defaults);

    found_dates.sort(); // Default sort is in order of struct fields

    Ok(found_dates)
}
