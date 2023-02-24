import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { introductionLines } from './static/data/introductionLines';
import { amenitiesLines } from './static/data/amenitiesLines';
import { descriptionLines } from './static/data/descriptionLines';
import { neighbourhoodLines } from './static/data/neighbourhoodLines';
import { InformationCard } from './components/InformationCard';
import { ImageCarousel } from './components/Carousel';

import { images, enjoyTheSun } from './static/images';
import { Alert } from 'react-bootstrap';

import './static/sass/app.scss';

export const App = () => (
  <Container fluid='lg'>
    <Row className='pt-4'>
      <Col className='text-center' xs={12}>
        <Alert variant='info' style={{ border: '3px solid white' }}>
          <h1 className='welcome-header font-xs'>
            Welcome to Calaceite FRONTLINE Vistamar!
          </h1>
        </Alert>
      </Col>
      <Col xs={12}>
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'center',
          // alignContent: 'center',
          objectFit: 'contain',
          overflow: 'auto',
          borderRadius: '20px',
        }}>
          <img src={enjoyTheSun} alt='Balcony view' />
        </div>
      </Col>
    </Row>

    <Row className='mt-4'>
      <Col sm={8} md={7} lg={6} xl={4} className='mx-auto'>
        <div
          className='rounded p-4'
          style={{
            background: '#e3fbe3',
            border: '3px solid lightgreen',
            textAlign: 'center',
          }}
        >
          <p style={{ textAlign: 'left' }}>
            Please contact Dawn-Ava for pricing and more information:
          </p>
          <span style={{ color: 'slategray', fontSize: '0.8rem' }}>
            WhatsApp: <b>+1 (416) 779-6411</b>
          </span>
          <br />
          <span style={{ color: 'slategray', fontSize: '0.8rem' }}>
            <b>calaceitefrontlinevistamar@gmail.com</b>
          </span>
        </div>
      </Col>
    </Row>

    <Row className='mt-2 mb-5 gy-2'>
      <Col lg={6}>
        <InformationCard
          lines={introductionLines}
          title='Overview'
          backgroundColor='#af0d12'
          color='white'
        />
      </Col>
      <Col lg={6}>
        <InformationCard
          lines={amenitiesLines}
          title='Amenities'
          backgroundColor='#fabe00'
        />
      </Col>
    </Row>

    <Row className='px-3'>
      <div
        className='rounded'
        style={{ backgroundColor: '#af0d12' }}
      >
        <Col className='m-auto' md={8}><ImageCarousel images={images} /></Col>
      </div>
    </Row>

    <Row className='my-4 pb-5'>
      <Col lg={6} className='mt-3'>
        <InformationCard
          lines={descriptionLines}
          title='Description'
          backgroundColor='#af0d12'
          color='white'
        />
      </Col>
      <Col lg={6} className='mt-3'>
        <InformationCard
          lines={neighbourhoodLines}
          title='Neighbourhood'
          backgroundColor='#fabe00'
        />
      </Col>
    </Row>
  </Container>
);
