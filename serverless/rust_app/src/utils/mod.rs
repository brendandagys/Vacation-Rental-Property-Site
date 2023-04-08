pub mod authorization;
pub mod dynamo_db;
pub mod http;
pub mod miscellaneous;

use lambda_http::Error;

pub fn str_vec_to_string_vec(items: Vec<&str>) -> Vec<String> {
    items.iter().map(|item| item.to_string()).collect()
}

pub struct YmdParts {
    pub year: u16,
    pub month: u8,
    pub date: u8,
}

pub fn get_parts_from_ymd(ymd: &str) -> Result<YmdParts, Error> {
    let year: u16 = ymd[0..4].parse()?; // Don't think it's worth matching 3 times...
    let month: u8 = ymd[5..7].parse()?;
    let date: u8 = ymd[8..10].parse()?;

    Ok(YmdParts { year, month, date })
}
