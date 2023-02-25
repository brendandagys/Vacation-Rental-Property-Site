import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { introductionLines } from './static/data/introductionLines';
import { amenitiesLines } from './static/data/amenitiesLines';
import { CalendarsContainer } from './components/calendar/CalendarsContainer';
import { descriptionLines } from './static/data/descriptionLines';
import { neighbourhoodLines } from './static/data/neighbourhoodLines';
import { InformationCard } from './components/InformationCard';
import { ImageCarousel } from './components/Carousel';

import { images, enjoyTheSun } from './static/images';
import { Alert } from 'react-bootstrap';

import './static/sass/app.scss';

export const App = () => (
  <Container fluid='md'>
    <Row className='pt-4'>
      <Col xs={12}>
        <Alert variant='info' className="app__header">
          <h1>Welcome to Calaceite FRONTLINE Vistamar!</h1>
        </Alert>
      </Col>

      <Col xs={12}>
        <div className="app__image">
          <img src={enjoyTheSun} alt='Balcony view' />
        </div>
      </Col>
    </Row>

    <Row className='my-5'>
      <Col sm={8} md={7} lg={6} xl={4} className='mx-auto'>
        <div className='app__contact-information p-4'>
          <p>Please contact Dawn-Ava for pricing and more information:</p>
          <span>WhatsApp: <b>+1 (416) 779-6411</b></span>
          <span><b>calaceitefrontlinevistamar@gmail.com</b></span>
        </div>
      </Col>
    </Row>

    <Row>
      <Col xs={12}>
        <CalendarsContainer />
      </Col>
    </Row>

    <Row className='gy-2 mb-5 mt-2'>
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

    <Row className='px-3'>
      <div className='app__image-carousel'>
        <Col className='m-auto' md={8}>
          <ImageCarousel images={images} />
        </Col>
      </div>
    </Row>

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
);
