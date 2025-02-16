import { Row } from "react-bootstrap";
import {
  testimonialBook1,
  testimonialBook2,
  testimonialBook3,
  testimonialBook4,
} from "../static/images";

const images = [
  testimonialBook3,
  testimonialBook2,
  testimonialBook1,
  testimonialBook4,
];

const getRandomRotation = () => {
  return Math.random() * 10 - 5; // Random rotation between -5 and 5 degrees
};

export const TestimonialsGallery: React.FC = () => {
  return (
    <div className="testimonials-gallery py-5">
      <Row className="justify-content-center align-items-center gap-5">
        {images.map((img, index) => (
          <img
            src={img.src}
            alt={`Testimonial book entry ${index + 1}`}
            style={{ transform: `rotate(${getRandomRotation()}deg)` }}
          />
        ))}
      </Row>
    </div>
  );
};
