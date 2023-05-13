/* eslint-disable max-len */
import { Col } from 'react-bootstrap';
import { Testimonial } from './Testimonial';

const testimonials = [
  {
    stars: 5,
    name: 'A M',
    content: 'Fantastic apartment with an unparalleled view. A pleasure every time to sit on the balcony and enjoy the beautiful sea view. Centrally located near Nerja and Torrox and Torrox Costa but also perfect place to explore the area and explore the nice little villages.',
  },
  {
    stars: 5,
    name: 'M B',
    content: 'We were extremely happy with this property. It is everything that the advertising says. From the views of the sea and hills to the interior and furnishings we were happy with it all. A car is handy to get easy access to the shopping in Torrox Costa and Nerja. The A7 highway is within easy reach and from there you can roam to Granada, Ronda (a must see), Seville and Malaga. Dawn-Ava is an excellent hostess and made sure everything went smoothly from her end. It would be great to come back for another visit.',
  },
  {
    stars: 5,
    name: 'M B',
    content: 'Honestly the best holiday yet! We enjoyed over a month in this apartment and we did not want to go home. The location is wonderful and the view was beyond amazing. The communication before arrival was exceptional as all details and directions were explained completely. Everyday, watching the waves from the terrace as we enjoyed our meals was lovely. Sleeping at night to the sound of the waves was an unexpected bonus too. The kitchen is well-equipped and the apartment was very clean. We will return soon. Thank you Dawn-Ava!',
  },
  {
    stars: 5,
    name: 'J H',
    content: 'Listing description was completely accurate. Unit was very clean, as was the complex. Easy 45 minute drive from the Malaga airport. Wonderful drives to Nerja, Torrox, Granada, Almuñécar, Mijas, Seville, and the Sierra Nevada Mtns (to ski!), etc. Central location to spend time in all these fantastic places. Nerja in particular is very close and has great restaurants, the caves, and the views from the Balcón de Europa are stunning. Ocean views amazing from the unit as well. The owner provided great customer service. Immediate replies to any questions we had. Very available on line to ensure our check-in was easy. Would highly recommend this property.',
  },
];

export const TestimonialsContainer = () => {
  return (
    <>
      {
        testimonials.map(({ stars, name, content }) => (
          <Col xs={12} md={6} xl={4} className='mx-3 mt-4'>
            <Testimonial
              stars={stars}
              name={name}
              content={content}
            />
          </Col>
        ))
      }

      <div className='text-center pt-4'>
        <p>Read more reviews on&nbsp;
          <a
            href="https://www.tripadvisor.ca/VacationRentalReview-g656870-d10343031-Calaceite_FRONTLINE_Vistamar_Luxury_Penthouse_Front_Seaview_Torrox_Nerja_Malaga-Torro.html"
            rel="noreferrer"
            target="_blank"
          >
            Tripadvisor
          </a> and&nbsp;
          <a
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
