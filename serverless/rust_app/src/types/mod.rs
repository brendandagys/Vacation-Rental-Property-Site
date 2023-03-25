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
pub enum PutRequestEntity {
    BookingInquiryRequest(booking_inquiry::BookingInquiryPutRequest),
    CalendarDateRequest(calendar_date::CalendarDatePutRequest),
    ContentRequest(content::ContentPutRequest),
    DefaultRequest(default::DefaultPutRequest),
    TestimonialRequest(testimonial::TestimonialPutRequest),
    UserRequest(user::UserPutRequest),

    CalendarDatesRequest(Vec<calendar_date::CalendarDatePutRequest>),
    ContentsRequest(Vec<content::ContentPutRequest>),
    DefaultsRequest(Vec<default::DefaultPutRequest>),
}
