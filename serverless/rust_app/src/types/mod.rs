pub mod auth;
pub mod booking_inquiry;
pub mod calendar_date;
pub mod content;
pub mod default;
pub mod http;
pub mod testimonial;
pub mod user;

use aws_sdk_dynamodb as dynamodb;
use chrono::{DateTime, Utc};
use dynamodb::types::builders::PutRequestBuilder;
use dynamodb::{operation::put_item::builders::PutItemFluentBuilder, types::AttributeValue};

use serde::Deserialize;

pub enum Index {
    GSI1,
}

impl Index {
    pub fn to_string(&self) -> String {
        match self {
            Index::GSI1 => format!("GSI-1"),
        }
    }
}

#[derive(Deserialize)]
#[serde(untagged)]
pub enum PutRequestEntity {
    BookingInquiryRequest(booking_inquiry::BookingInquiryPutRequest),
    CalendarDateRequest(calendar_date::CalendarDatePutRequest),
    ContentRequest(content::ContentPutRequest),
    DefaultRequest(default::DefaultPutRequest),
    TestimonialRequest(testimonial::TestimonialPutRequest),
    TestimonialToggleRequest(testimonial::TestimonialToggleRequest),
    UserRequest(user::UserPutRequest),

    CalendarDatesRequest(Vec<calendar_date::CalendarDatePutRequest>),
    ContentsRequest(Vec<content::ContentPutRequest>),
    DefaultsRequest(Vec<default::DefaultPutRequest>),
}

#[derive(Deserialize)]
#[serde(untagged)]
pub enum DeleteRequestEntity {
    TestimonialDeleteRequest(testimonial::TestimonialDeleteRequest),
}

pub trait Buildable {
    fn item(self, k: impl Into<String>, v: AttributeValue) -> Self;
}

impl Buildable for PutRequestBuilder {
    fn item(self, k: impl Into<String>, v: AttributeValue) -> Self {
        self.item(k, v)
    }
}
impl Buildable for PutItemFluentBuilder {
    fn item(self, k: impl Into<String>, v: AttributeValue) -> Self {
        self.item(k, v)
    }
}

pub trait BuildFunction<T: Buildable, U> {
    fn build_item(&self, builder: T, item: U, now: DateTime<Utc>) -> T;
}
