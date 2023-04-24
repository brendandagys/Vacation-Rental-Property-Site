import { useState } from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { enjoyTheSun, images } from '../static/images';
import { CalendarsContainer } from '../components/calendar-date/CalendarsContainer';
import { introductionLines } from '../static/data/lines/introductionLines';
import { amenitiesLines } from '../static/data/lines/amenitiesLines';
import { ImageCarousel } from '../components/Carousel';
import { descriptionLines } from '../static/data/lines/descriptionLines';
import { neighbourhoodLines } from '../static/data/lines/neighbourhoodLines';
import { InformationCard } from '../components/InformationCard';
import { BookingInquiryModal } from '../components/booking-inquiry/BookingInquiryModal';

export const HomePage = () => {
  const [ showBookingInquiryModal, setShowBookingInquiryModal ] = useState(false);

  return (
    <>
      <div className="app__image">
        <img src={enjoyTheSun} alt='Balcony view' />
      </div>

      <Container fluid='md'>
        <Row className='pt-4'>
          <Col xs={12}>
            <Alert variant='info' className="app__header">
              <h1>Welcome to Calaceite FRONTLINE Vistamar!</h1>
            </Alert>
          </Col>
        </Row>

        <Row className='my-5'>
          <Col xs={11} sm={10} md={8} lg={6} xl={4} className='mx-auto'>
            <div className='app__contact-information'>
              <p>Please contact Dawn-Ava for more information about a Spanish luxury holiday!</p>
              <span>WhatsApp: <b>+1 (416) 779-6411</b></span>
              <span><b>spainfrontline@gmail.com</b></span>
            </div>
          </Col>

        </Row>

        <Row className='justify-content-center pb-5 mb-3'>
          <Col className='text-center'>
            <Button
              size='lg'
              style={{ border: '1px solid white' }}
              onClick={() => setShowBookingInquiryModal(true)}
            >
              Request Quote
            </Button>
          </Col>
        </Row>

        {
          window.location.pathname !== '/admin' &&
        <Row>
          <Col xs={12}>
            <CalendarsContainer />
          </Col>
        </Row>
        }

        <Row className='gy-2 mb-5 mt-5 pt-5'>
          <Col lg={6}>
            <InformationCard
              backgroundColor='#af0d12'
              color='white'
              lines={introductionLines}
              title='Overview'
            />
          </Col>

          <Col lg={6}>
            <InformationCard
              backgroundColor='#fabe00'
              lines={amenitiesLines}
              title='Amenities'
            />
          </Col>
        </Row>

        {/* <Row className='px-3'>
        <div className='app__image-carousel'>
          <Col className='m-auto' md={8}>
            <ImageCarousel images={images} />
          </Col>
        </div>
      </Row> */}

        <Row className='my-4 pb-5'>
          <Col className='mt-3' lg={6}>
            <InformationCard
              backgroundColor='#af0d12'
              color='white'
              lines={descriptionLines}
              title='Description'
            />
          </Col>
          <Col lg={6} className='mt-3'>
            <InformationCard
              backgroundColor='#fabe00'
              lines={neighbourhoodLines}
              title='Neighbourhood'
            />
          </Col>
        </Row>
      </Container>

      <BookingInquiryModal show={showBookingInquiryModal} setShow={setShowBookingInquiryModal} />
    </>
  );
};
