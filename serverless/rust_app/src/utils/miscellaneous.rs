use crate::types::testimonial::Stars;

pub fn get_stars_number(stars: Stars) -> f32 {
    match stars {
        Stars::Zero => 0.0,
        Stars::Half => 0.5,
        Stars::One => 1.0,
        Stars::OneAndAHalf => 1.5,
        Stars::Two => 2.0,
        Stars::TwoAndAHalf => 2.5,
        Stars::Three => 3.0,
        Stars::ThreeAndAHalf => 3.5,
        Stars::Four => 4.0,
        Stars::FourAndAHalf => 4.5,
        Stars::Five => 5.0,
    }
}
