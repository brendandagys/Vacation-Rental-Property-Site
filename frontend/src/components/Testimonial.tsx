import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as solidStar,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

interface TestimonialProps {
  content: string;
  name: string;
  stars: number;
}

export const Testimonial = ({ content, name, stars }: TestimonialProps) => {
  const renderStars = () => {
    const starsArray = [];
    const fullStars = Math.floor(stars);
    const hasHalfStar = stars % 1 === 0.5;
    const totalStars = 5;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      starsArray.push(<FontAwesomeIcon key={`full-${i}`} icon={solidStar} />);
    }

    // Add half star if needed
    if (hasHalfStar) {
      starsArray.push(<FontAwesomeIcon key="half" icon={faStarHalfStroke} />);
    }

    // Add empty stars to make up to 5
    const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      starsArray.push(
        <FontAwesomeIcon key={`empty-${i}`} icon={regularStar} />
      );
    }

    return starsArray;
  };

  return (
    <div className="testimonial">
      <div className="testimonial-content">
        <div className="d-flex align-items-center">
          <p className="testimonial-author mb-0 ms-3">{name}</p>

          <div className="testimonial-stars">{renderStars()}</div>
        </div>

        <p className="testimonial-text">{content}</p>
      </div>
    </div>
  );
};
