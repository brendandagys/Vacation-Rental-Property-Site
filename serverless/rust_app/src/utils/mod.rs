pub mod auth;
pub mod dynamo_db;
pub mod http;
pub mod miscellaneous;
pub mod sns;

use lambda_http::http::StatusCode;

pub fn str_vec_to_string_vec(items: Vec<&str>) -> Vec<String> {
    items.iter().map(|item| item.to_string()).collect()
}

pub struct YmdParts {
    pub year: u16,
    pub month: u8,
    pub date: u8,
}

pub fn get_parts_from_ymd(ymd: &str) -> Result<YmdParts, (StatusCode, String)> {
    let year: i32 = ymd[0..4].parse().unwrap_or(400000);
    let month: u32 = ymd[5..7].parse().unwrap_or(0);
    let date: u32 = ymd[8..10].parse().unwrap_or(0);

    let clean_date = chrono::NaiveDate::from_ymd_opt(year, month, date);

    if let None = clean_date {
        return Err((
            StatusCode::BAD_REQUEST,
            format!("Cannot parse YMD: {ymd}. Format is YYYY-MM-DD."),
        ));
    }

    Ok(YmdParts {
        year: year as u16,
        month: month as u8,
        date: date as u8,
    })
}
