use aws_sdk_dynamodb as dynamodb;
use dynamodb::model::{AttributeValue, KeysAndAttributes};
use lambda_http::{http::StatusCode, service_fn, Body, Error, Request, RequestExt, Response};
use serde_dynamo::from_items;
use std::collections::HashMap;

mod types;
mod utils;

#[tokio::main]
async fn main() -> Result<(), Error> {
    lambda_http::run(service_fn(get_calendar_dates_by_date)).await?;
    Ok(())
}

async fn get_calendar_dates_by_date(request: Request) -> Result<Response<Body>, Error> {
    let query_map = request.query_string_parameters();
    let dates = query_map.all("dates").unwrap_or(Vec::new());
    println!("QueryMap: {:?}", query_map);
    println!("dates: {:?}", dates);

    let client = utils::get_dynamo_db_client().await;

    let mut keys_and_attributes_builder = KeysAndAttributes::builder();

    for requested_date in dates {
        keys_and_attributes_builder = keys_and_attributes_builder.keys(HashMap::from([
            ("PK".into(), AttributeValue::S("DATE".into())),
            ("SK".into(), AttributeValue::S(format!("{requested_date}"))),
        ]))
    }

    let keys_and_attributes = keys_and_attributes_builder.build();

    let result = match client
        .batch_get_item()
        .request_items("business-site".to_string(), keys_and_attributes)
        .send()
        .await
    {
        Ok(result) => result,
        Err(error) => {
            return Ok(utils::build_http_response(
                StatusCode::INTERNAL_SERVER_ERROR,
                &error.to_string(),
            ));
        }
    };

    // println!("1 - {:?}", result);

    let calendar_date_ddb_items = result
        .responses()
        .unwrap()
        .get("business-site")
        .unwrap()
        .clone();

    // println!("2 - {:?}", calendar_date_ddb_items);

    let calendar_dates: Vec<types::calendar_date::CalendarDate> =
        from_items(calendar_date_ddb_items)?;

    // println!("3 - {:?}", calendar_dates);

    match serde_json::to_string(&calendar_dates) {
        Ok(string) => Ok(utils::build_http_response(StatusCode::OK, &string)),
        Err(error) => Ok(utils::build_http_response(
            StatusCode::INTERNAL_SERVER_ERROR,
            &error.to_string(),
        )),
    }
}
