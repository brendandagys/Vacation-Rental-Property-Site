import { Row } from "react-bootstrap";
import {
  testimonialBook1,
  testimonialBook2,
  testimonialBook3,
  testimonialBook4,
} from "../static/images";
import { useLanguage } from "../context/languageContext";

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
  const { getText } = useLanguage();

  return (
    <div className="testimonials-gallery py-5">
      <h1 className="text-white text-center mb-5 pb-4">
        {getText("guest-book-title")}
      </h1>
      <Row className="justify-content-center align-items-center gap-5">
        {images.map((img, index) => (
          <img
            key={img.src}
            src={img.src}
            alt={`Testimonial book entry ${index + 1}`}
            style={{ transform: `rotate(${getRandomRotation()}deg)` }}
          />
        ))}
      </Row>
    </div>
  );
};
