use lambda_http::{http::StatusCode, service_fn, Body, Error, Request, RequestExt, Response};
mod types;

#[tokio::main]
async fn main() -> Result<(), Error> {
    lambda_http::run(service_fn(get_calendar_dates_by_date)).await?;
    Ok(())
}

async fn get_calendar_dates_by_date(request: Request) -> Result<Response<Body>, Error> {
    let query_map = request.query_string_parameters();
    let dates = query_map.all("dates").unwrap_or(Vec::new());
    println!("QS: {:?}", dates);

    let date_1 = types::CalendarDate {
        ymd: "2023-04-01".to_string(),
        state: Some(types::DateState::Booked),
        price: Some(105),
        year: Some(2023),
        month: Some(4),
        date: Some(1),
        cell_color: None,
        created: Some("2023-02-02T11:11:11".to_string()),
        modified: None,
    };

    let date_2 = types::CalendarDate {
        ymd: "2023-04-02".to_string(),
        state: Some(types::DateState::Booked),
        price: Some(105),
        year: Some(2023),
        month: Some(4),
        date: Some(2),
        cell_color: None,
        created: Some("2023-02-02T11:11:11".to_string()),
        modified: None,
    };

    let calendar_dates = vec![date_1, date_2];

    match serde_json::to_string(&types::GetCalendarDatesByDateResponse { calendar_dates }) {
        Ok(string) => Ok(Response::builder().body(string.into())?),
        Err(error) => {
            println!("Error: {:?}", error);
            Ok(Response::builder()
                .status(StatusCode::INTERNAL_SERVER_ERROR)
                .body("Error".into())?)
        }
    }
}
