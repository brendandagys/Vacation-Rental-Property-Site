use lambda_http::{run, service_fn};

mod fetch_handlers;
mod types;
mod utils;

#[tokio::main]
async fn main() -> Result<(), lambda_http::Error> {
    run(service_fn(
        fetch_handlers::batch_get_item::get_calendar_dates_by_date,
    ))
    .await?;
    Ok(())
}
