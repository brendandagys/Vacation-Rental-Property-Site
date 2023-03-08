use aws_sdk_dynamodb as dynamodb;
use dynamodb::{model::AttributeValue, Region};
use lambda_http::{service_fn, Body, Error, Request, Response};

mod types;

#[tokio::main]
async fn main() -> Result<(), Error> {
    lambda_http::run(service_fn(put_item)).await?;
    Ok(())
}

async fn put_item(request: Request) -> Result<Response<Body>, Error> {
    let config = aws_config::load_from_env().await;
    let local_config = dynamodb::config::Builder::from(&config)
        .endpoint_url("http://docker.for.mac.localhost:8000")
        .build();
    let client = dynamodb::Client::from_conf(local_config);

    let date_1 = types::CalendarDate {
        ymd: "2025-04-03".to_string(),
        state: Some(types::DateState::Unavailable),
        price: Some(905),
        year: Some(2035),
        month: Some(4),
        date: Some(3),
        cell_color: None,
        created: Some("2020-02-02T11:11:11".to_string()),
        modified: None,
    };

    match client
        .put_item()
        .table_name("business-site")
        .item("PK", AttributeValue::S("DATE".into()))
        .item("SK", AttributeValue::S(date_1.ymd.clone()))
        .item("ymd", AttributeValue::S(date_1.ymd))
        .item(
            "state",
            AttributeValue::S(format!("{:?}", types::DateState::Unavailable)),
        )
        .item(
            "price",
            AttributeValue::N(format!("{:?}", date_1.price.unwrap())),
        )
        .send()
        .await
    {
        Ok(_) => {}
        Err(error) => {
            println!("Error: {:?}", error);
        }
    }

    Ok(Response::builder().body("Put item".into())?)
}
