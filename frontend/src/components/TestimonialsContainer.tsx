/* eslint-disable max-len */
import { Col } from 'react-bootstrap';
import { Testimonial } from './Testimonial';
import { useLanguage } from '../context/languageContext';

export const TestimonialsContainer = () => {
  const { getText } = useLanguage();

  const testimonials = [
    {
      stars: 5,
      name: 'A M',
      content: (getText('testimonials-1') || '').toString(),
    },
    {
      stars: 5,
      name: 'M B',
      content: (getText('testimonials-2') || '').toString(),
    },
    {
      stars: 5,
      name: 'M B',
      content: (getText('testimonials-3') || '').toString(),
    },
    {
      stars: 5,
      name: 'J H',
      content: (getText('testimonials-4') || '').toString(),
    },
  ];

  return (
    <>
      {
        testimonials.map(({ stars, name, content }, i) => (
          <Col key={i} xs={12} md={6} xl={4} className='mx-3 mt-4'>
            <Testimonial
              stars={stars}
              name={name}
              content={content}
            />
          </Col>
        ))
      }

      <div className='text-center pt-4 text-white'>
        <p>{getText('testimonials-read-more')}&nbsp;
          <a
            className="text-white text-decoration-underline"
            href="https://www.tripadvisor.ca/VacationRentalReview-g656870-d10343031-Calaceite_FRONTLINE_Vistamar_Luxury_Penthouse_Front_Seaview_Torrox_Nerja_Malaga-Torro.html"
            rel="noreferrer"
            target="_blank"
          >
            Tripadvisor
          </a> {getText('testimonials-read-more-and')}&nbsp;
          <a
            className="text-white text-decoration-underline"
            href="https://www.vrbo.com/en-ca/cottage-rental/p4160411?uni_id=4562157&adultsCount=2&arrival=2023-06-12&departure=2023-06-23"
            rel="noreferrer"
            target="_blank"
          >
            Vrbo
          </a>
        </p>
      </div>
    </>
  );
};
