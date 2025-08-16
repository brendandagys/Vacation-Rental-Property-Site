import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface TestimonialProps {
  content: string;
  name: string;
  stars: number;
}

export const Testimonial = ({ content, name, stars }: TestimonialProps) => {
  return (
    <div className="testimonial">
      <div className="testimonial-content">
        <div className="d-flex align-items-center">
          <div className="testimonial-avatar">
            <span className="initials">
              {name
                .split(" ")
                .map((el) => el[0])
                .join("")}
            </span>
          </div>

          <p className="testimonial-author mb-0 ms-3">{name}</p>

          <div className="testimonial-stars">
            {Array(stars)
              .fill("")
              .map((_, index) => (
                <FontAwesomeIcon key={index} icon={faStar} />
              ))}
          </div>
        </div>

        <p className="testimonial-text">{content}</p>
      </div>
    </div>
  );
};
