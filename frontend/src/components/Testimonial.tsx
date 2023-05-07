import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface TestimonialProps {
  name: string;
  content: string;
  stars: number;
}

const Testimonial = ({ name, content, stars }: TestimonialProps) => {
  return (
    <div className="testimonial">
      <div className="testimonial-avatar">
        <span className='initials'>{name.split(' ').map((el) => el[0]).join('')}</span>
      </div>

      <div className="testimonial-content">
        <p className="testimonial-author">{name}</p>

        <div className="testimonial-stars">
          {Array(stars).fill('').map((_, index) => <FontAwesomeIcon key={index} icon={faStar} />)}
        </div>

        <p className="testimonial-text">{content}</p>
      </div>
    </div>
  );
};

export default Testimonial;
