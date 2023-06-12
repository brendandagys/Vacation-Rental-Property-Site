import { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import {
  images,
  mainImage,
  mainImageMobile,
  seaViewDaytime,
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
import { MainLanding } from '../components/MainLanding';
import { MainDetailsText } from '../components/MainDetailsText';
import { useViewportWidth } from '../hooks/useViewportWidth';
import { Video } from '../components/Video';
import { MoreDetailsText } from '../components/MoreDetailsText';
import { TextContainer } from '../components/TextContainer';
import { AttractionsText } from '../components/AttractionsText';

export const HomePage = () => {
  const [ fromTo, setFromTo ] = useState<Nullable<string>>(null);
  const [ numDatesSelected, setNumDatesSelected ] = useState(0);
  const [ subtotal, setSubtotal ] = useState<Nullable<number>>(null);

  const [ showBookingInquiryModal, setShowBookingInquiryModal ] = useState(false);
  const [ showPostSubmissionModal, setShowPostSubmissionModal ] = useState(false);

  const width = useViewportWidth();

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
        <MainLanding setShowBookingInquiryModal={setShowBookingInquiryModal} width={width} />
      </div>

      <div className='app__description'>
        <Container className='px-5' style={{ paddingTop: '3.75rem', paddingBottom: '3.75rem' }}>
          <MainDetailsText />
        </Container>
      </div>

      <Video />

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
          className="d-flex align-items-center pb-4 pt-4 px-4 px-sm-5 px-md-3 px-lg-4 px-xl-5"
          style={{ background: '#dc3830' }}
        >
          <div className='font-sm text-white more-details-container py-3 py-sm-0'>
            <Col xs={12} className='mb-5 text-center'><h1>Details</h1></Col>
            <TextContainer buttonColor='red'>
              <MoreDetailsText />
            </TextContainer>
          </div>
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

      <Row className='mx-0 flex-column-reverse flex-md-row'>
        <Col
          xs={12}
          md={6}
          className='p-0 d-flex align-items-center'
          style={{ background: '#2a2d38', objectFit: 'cover' }}
        >
          <img src={tertiaryImage.src} width="100%" alt={tertiaryImage.alt} />
        </Col>

        <Col
          xs={12}
          md={6}
          className="d-flex align-items-center justify-content-center
            pb-4 pt-4 px-4 px-sm-5 px-md-3 px-lg-5"
          style={{ background: '#ffd157' }}
        >
          <div className='app__neighborhood py-3 py-sm-0'>
            <Amenities />
          </div>
        </Col>
      </Row>

      <Row id="information" className='mx-0'>
        <Col
          xs={12}
          md={6}
          className="d-flex align-items-center pb-4 pt-4 px-4 px-sm-5 px-md-4 px-lg-5"
          style={{ background: '#9bdc9c' }}
        >
          <div className='font-sm text-black py-3 py-sm-0'>
            <Col xs={12} className='mb-5 text-center'><h1>Attractions</h1></Col>
            <TextContainer buttonColor='green' buttonText='More attractions'>
              <AttractionsText />
            </TextContainer>
          </div>
        </Col>

        <Col
          xs={12}
          md={6}
          className='p-0 d-flex align-items-center'
          style={{ background: '#2a2d38', objectFit: 'cover' }}
        >
          <img src={seaViewDaytime.src} width="100%" alt={seaViewDaytime.alt} />
        </Col>
      </Row>

      <Row className="image-gallery-container py-5 mx-0">
        <Col xs={12}><ImageGallery images={images} /></Col>
      </Row>

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

      <PostSubmissionModal
        setShow={setShowPostSubmissionModal}
        show={showPostSubmissionModal}
      />
    </div>
  );
};
