use lambda_http::{service_fn, Body, Error, Request, Response};

#[tokio::main]
async fn main() -> Result<(), Error> {
    lambda_http::run(service_fn(get_calendar_dates_by_date)).await?;
    Ok(())
}

async fn get_calendar_dates_by_date(request: Request) -> Result<Response<Body>, Error> {
    println!(
        "get_calendar_dates_by_date() received the following request: {:?}",
        request
    );

    Ok(Response::builder()
        .status(200)
        .body("No dates returned.".into())?)
}
