pub mod booking_inquiry;
pub mod calendar_date;
pub mod content;
pub mod default;
pub mod log_in;
pub mod testimonial;
pub mod user;

use serde::Deserialize;

#[derive(Deserialize)]
#[serde(untagged)]
pub enum PutRequestEntities {
    BookingInquiry(booking_inquiry::BookingInquiryPutRequest),
    CalendarDateRequest(calendar_date::CalendarDatePutRequest),
    ContentRequest(content::ContentPutRequest),
    DefaultRequest(default::DefaultPutRequest),
    TestimonialRequest(testimonial::TestimonialPutRequest),
    UserRequest(user::UserPutRequest),
}

// #[derive(Debug, Deserialize)]
// pub struct GetCalendarDatesByDateRequest {
//     pub dates: Option<Vec<String>>,
// }

// #[derive(Debug, Serialize)]
// pub struct GetCalendarDatesByDateResponse {
//     pub calendar_dates: Vec<CalendarDate>,
// }
