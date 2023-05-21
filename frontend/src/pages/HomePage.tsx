import { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import {
  images,
  mainImage,
  mainImageMobile,
  secondaryImage,
  tertiaryImage,
} from '../static/images';
import { CalendarsContainer } from '../components/calendar-date/CalendarsContainer';
import { BookingInquiryModal } from '../components/booking-inquiry/BookingInquiryModal';
import { PostSubmissionModal } from '../components/booking-inquiry/PostSubmissionModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { Nullable } from '../types';
import { getDatesInRange, mapCalendarDateToDate, mapCalendarDateToYmd } from '../api/calendarsContainer';
import { Amenities } from '../components/Amenities';
import { ImageGallery } from '../components/ImageGallery';
import { Navbar } from '../components/Navbar';
import { TestimonialsContainer } from '../components/TestimonialsContainer';
import { DescriptionModal } from '../components/DescriptionModal';
import { PointsOfInterestText } from '../components/PointsOfInterestText';
import { MainLanding } from '../components/MainLanding';
import { MainDetailsText } from '../components/MainDetailsText';
import { useViewportWidth } from '../hooks/useViewportWidth';
// import { Video } from '../components/Video';

export const HomePage = () => {
  const [ fromTo, setFromTo ] = useState<Nullable<string>>(null);
  const [ numDatesSelected, setNumDatesSelected ] = useState(0);
  const [ subtotal, setSubtotal ] = useState<Nullable<number>>(null);

  const [ showBookingInquiryModal, setShowBookingInquiryModal ] = useState(false);
  const [ showDescriptionModal, setShowDescriptionModal ] = useState(false);
  const [ showPostSubmissionModal, setShowPostSubmissionModal ] = useState(false);

  const width =  useViewportWidth();

  return (
    <div id="home" className='overflow-visible'>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${width >= 1100 ? mainImage.src : mainImageMobile.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <MainLanding setShowBookingInquiryModal={setShowBookingInquiryModal} />
      </div>

      <div className='app__description'>
        <Container className='px-5' style={{ paddingTop: '3.75rem', paddingBottom: '3.75rem' }}>
          <MainDetailsText />

          <div className='pt-5 mt-4 d-flex justify-content-center'>
            <button
              onClick={() => setShowDescriptionModal(true)}
              className="button button--light button--small"
            >
              More details
            </button>
          </div>
        </Container>
      </div>

      {/* <Video /> */}

      <Container>
        {
          window.location.pathname !== '/admin' &&
          <Row className='mt-5'>
            <Col xs={12}>
              <div className='text-center text-white mb-5'>
                <h1>Calendar</h1>
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
          className='p-4 pt-5 p-lg-5 d-flex align-items-center'
          style={{ background: '#af0d12', minHeight: 300 }}
        >
          <Amenities />
        </Col>

        <Col
          xs={12}
          md={6}
          className='p-0 d-flex align-items-center'
          style={{ background: '#2a2d38', objectFit: 'cover' }}
        >
          <img src={secondaryImage.src} width="100%" alt={secondaryImage.alt} />
        </Col>
      </Row>

      <Row className='d-md-none bg-black' style={{ minHeight: 15 }} />

      <Row className='mx-0'>
        <Col
          xs={12}
          md={6}
          className='p-0 d-flex align-items-center'
          style={{ background: '#2a2d38', objectFit: 'cover' }}
        >
          <img src={tertiaryImage.src} width="100%" alt={tertiaryImage.alt}></img>
        </Col>

        <Col
          xs={12}
          md={6}
          className="d-flex align-items-center"
          style={{ background: '#fabe00', minHeight: 300 }}
        >
          <div className='app__neighborhood font-sm'>
            <Container className='py-5 px-4 px-lg-5'>
              <Col xs={12} className='text-center text-black mb-5'><h1>Points of Interest</h1></Col>
              <PointsOfInterestText />
            </Container>
          </div>
        </Col>
      </Row>

      <Row className='py-5 bg-black mx-0'><Col xs={12}><ImageGallery images={images} /></Col></Row>

      <Row id="testimonials" className='py-5 px-5 mx-0 justify-content-center testimonials-container'>
        <Col xs={12} className='text-center text-white mb-5'><h1>Testimonials</h1></Col>

        <TestimonialsContainer />
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

      <DescriptionModal show={showDescriptionModal} setShow={setShowDescriptionModal} />

      <PostSubmissionModal
        setShow={setShowPostSubmissionModal}
        show={showPostSubmissionModal}
      />
    </div>
  );
};
