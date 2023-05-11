import { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { balconySunset, lowerPool, pictures, secondBedroom } from '../static/images';
import { CalendarsContainer } from '../components/calendar-date/CalendarsContainer';
import { BookingInquiryModal } from '../components/booking-inquiry/BookingInquiryModal';
import { PostSubmissionModal } from '../components/booking-inquiry/PostSubmissionModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCopyright } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as WhatsAppLogo } from '../static/icons/whatsapp.svg';
import { Nullable } from '../types';
import { getDatesInRange, mapCalendarDateToDate, mapCalendarDateToYmd } from '../api/calendarsContainer';
import { Amenities } from '../components/Amenities';
import { ImageGallery } from '../components/ImageGallery';
import Testimonial from '../components/Testimonial';
import { Navbar } from '../components/Navbar';

export const HomePage = () => {
  const [ fromTo, setFromTo ] = useState<Nullable<string>>(null);
  const [ numDatesSelected, setNumDatesSelected ] = useState(0);
  const [ subtotal, setSubtotal ] = useState<Nullable<number>>(null);

  const [ showBookingInquiryModal, setShowBookingInquiryModal ] = useState(false);
  const [ showPostSubmissionModal, setShowPostSubmissionModal ] = useState(false);

  return (
    <div id="home" className='overflow-visible'>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${balconySunset})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container fluid='md'>
          <Row className='flex-column justify-content-between pt-5' style={{ minHeight: 700 }}>
            <Col xs={12} className='d-flex justify-content-center'>
              <div className="app__welcome text-center">
                <h1><i>Welcome</i> to Calaceite FRONTLINE Vistamar</h1>
              </div>
            </Col>

            <Col id='book' xs={12} className='d-flex mt-auto mb-4 justify-content-center'>
              <div className="app__header">
                <h4>Contact us for more information about your next Spanish holiday!</h4>

                <h5 className='mt-3'>
                  <Row className='justify-content-between'>
                    <Col sm={6} className='align-items-center text-center mt-2'>
                      <FontAwesomeIcon icon={faEnvelope} size='lg' />
                      <span style={{ marginLeft: 10, color: 'yellow' }}>
                        <b>Email: </b>spainfrontline@gmail.com
                      </span>
                    </Col>

                    <Col sm={6} className='text-center mt-2'>
                      <WhatsAppLogo style={{ width: '2rem', height: '2rem' }} />
                      <span style={{ marginLeft: 5, color: 'yellow' }}>
                        <b>Whatsapp: </b>+1 (416) 779-6411
                      </span>
                    </Col>
                  </Row>
                </h5>
              </div>
            </Col>

            <Col xs={12} className='text-center' style={{ marginBottom: '5rem' }}>
              <button onClick={() => setShowBookingInquiryModal(true)} className="button">
                Reserve Now
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      <div className='app__description'>
        <Container className='px-5' style={{ paddingTop: '3.75rem', paddingBottom: '4.5rem' }}>
          <p>
            Indulge in luxury and serenity at our exquisite coastal retreat. Located in the Nerja and
            Torrox-Costa region of <b>Costa del Sol, Spain</b>, our property offers an amazing <b>180°
            first-line south-facing sea view</b> of the Alboran Sea and mountains. <b>Walk to the sandy
            El Penoncillo Beach</b>, enjoy the fully equipped and well-maintained suite with <b>2 bedrooms,
            2 bathrooms</b>, and a fully stocked kitchen. Relax by the <b>two large outdoor
            pools</b> surrounded by lush green gardens. The sunny terrace allows you to watch the waves
            during the day and sleep to their soothing sound at night.
          </p>
          <p>
            Explore the exciting tourist attractions in the area and enjoy the guaranteed Spanish sunshine
            all year round. Our property offers <b>free central air conditioning and heating</b>, <b>luxury
            cotton linens</b>, and modern amenities such as a <b>washing machine, dryer, fast Wi-Fi</b>, and
            a <b>65" 4K smart TV</b>. <b>Private parking</b> is also included.
          </p>
          <p id="availability">
            Only a 40-minute drive from Malaga airport, this spot is perfect for a romantic, retirement,
            or family holiday. Long-term rentals are welcome, allowing you to enjoy the sun during the
            winter months. Check-in is made easy. Experience a truly remarkable getaway
            - <b>get in touch now</b>!
          </p>
        </Container>
      </div>

      <Container>
        {
          window.location.pathname !== '/admin' &&
          <Row className='mt-5'>
            <Col xs={12}>
              <div className='text-center text-white mb-5'>
                <h1>Availability</h1>
                <p className='font-sm mt-4'>Select a date range below to begin an inquiry</p>
              </div>

              <CalendarsContainer
                onDateRangeCleared={() => { setFromTo(null); setNumDatesSelected(0); }}
                onDateRangeSelected={
                  (from, to) => {
                    setFromTo(`${mapCalendarDateToYmd(from)} - ${mapCalendarDateToYmd(to)}`);
                    setNumDatesSelected(
                      getDatesInRange(mapCalendarDateToDate(from), mapCalendarDateToDate(to)).length
                    );
                    setShowBookingInquiryModal(true);
                  }
                }
                setSubtotal={setSubtotal}
              />
            </Col>
          </Row>
        }
      </Container>

      <Row id="information" className='mx-0' style={{ marginTop: '5rem' }}>
        <Col
          xs={12}
          md={6}
          className='p-0 d-flex align-items-center'
          style={{ background: 'black', objectFit: 'cover' }}
        >
          <img src={lowerPool} width="100%" alt="Lower pool" />
        </Col>

        <Col xs={12} md={6} className='p-5' style={{ background: '#af0d12', minHeight: 300 }}>
          <Amenities />
        </Col>
      </Row>

      <Row className='mx-0'>
        <Col xs={12} md={6} style={{ background: '#fabe00', minHeight: 300 }}>
          <div className='app__neighborhood font-sm'>
            <Container className='py-5 px-5'>
              <Col xs={12} className='text-center text-black mb-5'><h1>Points of Interest</h1></Col>
              <p>There are plenty of nearby attractions to explore during your stay:</p>
              <p>
                The breathtaking town of <b>Nerja</b> and its famous <b>Balcony of Europe</b> offer stunning
                views that will leave you in awe. Don't miss the chance to visit the <b>Nerja Crystal
                Caves</b>, a must-see.
              </p>
              <p>
                Take a leisurely stroll along the <b>Torrox-Costa Passeo</b>, a lovely promenade lined with
                beach shops, bars, and restaurants. Experience the vibrant atmosphere of the <b>outdoor
                street markets</b>, held in different villages every morning from 10am to 2pm. Torrox
                hosts the market on Mondays, while Nerja is the place to be on Tuesdays.
              </p>
              <p>
                For beach lovers, the best <b>sandy beaches stretch right in front of the complex</b>, from
                Nerja to Torrox-Costa. <b>Burriana Beach in Nerja</b> is particularly popular and bustling
                with tourists.
              </p>
              <p>
                Adventurous souls can embark on the thrilling <b>Rio Chillar river walk</b> near Nerja. This
                athletic and enjoyable activity is recommended with water-safe shoes and a walking stick,
                although it can be done with rugged sandals or running shoes.
              </p>
              <p>
                Take a short drive to <b>Torrox-Pueblo</b>, a unique old village nestled in the mountains.
                For more picturesque beauty, head north to the stunning white-washed mountain village
                of <b>Frigiliana</b>.
              </p>
              <p>
                If you're up for a day trip, visit the <b>Alhambra Castle in Granada</b>, one of Spain's
                main attractions. Make sure to order your tickets online in advance. For winter sports
                enthusiasts, the <b>Sierra Nevada Mountain Ski Station</b> is a 90-minute drive north,
                and offers excellent opportunities for winter sports. Visit the beach and mountain
                on the same day!
              </p>
              <p>
                <b>Ronda</b>, another charming mountain village to the north, boasts breathtaking views
                from its iconic bridge spanning a deep gorge.
              </p>
              <p>
                Explore <b>Malaga City</b>, where you'll find a combination of shopping opportunities
                and the chance to hike the stunning <b>Caminito del Rey</b>. Remember to secure your
                tickets online beforehand.
              </p>
              <p>
                Nearby, you can enjoy family-friendly attractions such as the <b>Bioparc
                Zoo</b>, <b>Aqualand</b>, <b>Tivoli World</b>, and <b>Aquavelis Water Parks</b>,
                all conveniently located near Malaga.
              </p>
              <p>
                For a unique experience, take a cable car to the <b>Birds of Prey Exhibition in
                Benalmadena</b>. Be sure to order your tickets online.
              </p>
              <p id="gallery">
                If you're up for a longer drive to the west, make a visit to <b>Marbella</b>
                , <b>Puerto Banus</b>, <b>Cordoba</b>, <b>Seville</b>, and <b>Gibraltar</b>,
                each offering its own distinct charm and attractions.
              </p>
            </Container>
          </div>
        </Col>

        <Col
          xs={12}
          md={6}
          className='p-0 d-flex align-items-center'
          style={{ background: '#2a2d38', objectFit: 'cover' }}
        >
          <img src={secondBedroom} width="100%" alt="Second bedroom"></img>
        </Col>
      </Row>

      <Row className='py-5 bg-black mx-0'><Col xs={12}><ImageGallery images={pictures} /></Col></Row>

      <Row id="testimonials" className='py-5 mx-5 justify-content-center'>
        <Col xs={12} className='text-center text-white mb-5'><h1>Testimonials</h1></Col>

        <Col xs={12} md={6} xl={4} className='mx-3 mt-4'>
          <Testimonial
            stars={5}
            name="Jonathon Henning"
            // eslint-disable-next-line max-len
            content="I had an amazing stay at this vacation property! The stunning coastal views, luxurious amenities, and attentive staff made my experience unforgettable. From the moment I arrived, I felt pampered and relaxed. The beautifully decorated rooms provided a comfortable and stylish retreat. Whether I was enjoying the poolside serenity or taking leisurely walks along the nearby beach, every moment was pure bliss. If you're seeking a dreamy coastal getaway with top-notch service, this property is the perfect choice. I can't wait to return and make more incredible memories!"
          />
        </Col>

        <Col xs={12} md={6} xl={4} className='mx-3 mt-4'>
          <Testimonial
            stars={5}
            name="Mary Brigby"
            // eslint-disable-next-line max-len
            content="During my recent stay at this vacation property, I experienced pure tranquility and cleanliness. The surrounding area offered stunning views and perfect weather, creating an ideal setting for outdoor activities. The staff ensured everything was spotless and made my stay hassle-free. If you're looking for a peaceful getaway with beautiful surroundings, this property is a top choice. It guarantees a memorable and refreshing experience."
          />
        </Col>
      </Row>

      <div id="map" className='d-flex flex-column justify-content-center align-items-center app__footer'>
        <iframe
          // eslint-disable-next-line max-len
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3197.4067387539094!2d-3.935007073487389!3d36.736806972265285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sCalle%20Cipr%C3%A9s%2C%20Bloque%206%2C%20Apto%206132!5e0!3m2!1sen!2sca!4v1683338409221!5m2!1sen!2sca"
          width="95%"
          height="92%"
          loading="lazy"
        />
        <div className='mt-5 mb-5'>
          <p className='font-xs app__copyright'>
            <FontAwesomeIcon icon={faCopyright} /> 2023 All rights reserved
          </p>
        </div>
      </div>

      <BookingInquiryModal
        fromTo={fromTo}
        numDatesSelected={numDatesSelected}
        setShow={setShowBookingInquiryModal}
        setShowPostSubmissionModal={setShowPostSubmissionModal}
        show={showBookingInquiryModal}
        subtotal={subtotal}
      />

      <PostSubmissionModal
        setShow={setShowPostSubmissionModal}
        show={showPostSubmissionModal}
      />
    </div>
  );
};
