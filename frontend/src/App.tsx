import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { introductionLines } from './data/introductionLines';
import { amenitiesLines } from './data/amenitiesLines';
import { descriptionLines } from './data/descriptionLines';
import { neighbourhoodLines } from './data/neighbourhoodLines';
import { InformationCard } from './components/InformationCard';
import { ImageCarousel } from './components/Carousel';

import { images } from './images';
import { Alert } from 'react-bootstrap';

function App() {
  return (
    <Container fluid="lg" className="pt-2">
      <Row className="py-5">
        <Col className="text-center">
          <Alert variant='primary'>
            <h1>
              Welcome to Fuerte Calaceite FRONTLINE Vistamar!
            </h1>
          </Alert>
          <h3 className="mt-4 text-muted">Luxury on the Sea!</h3>
        </Col>
      </Row>
      <Row className="mt-2 mb-5 gy-2">
        <Col lg={6}>
          <InformationCard
            lines={introductionLines}
            title='Overview'
            variant='info'
          />
        </Col>
        <Col lg={6}>
          <InformationCard
            lines={amenitiesLines}
            title='Amenities'
            variant='success'
          />
        </Col>
      </Row>

      <Row className="px-3">
        <div className="rounded" style={{ backgroundColor: '#ddd3ee' }}>
          <Col className="m-auto" md={8}>
            <ImageCarousel images={images} />
          </Col>
        </div>
      </Row>

      <Row className="my-4">
        <Col>
          <InformationCard
            lines={descriptionLines}
            title='Description'
            variant='warning'
          />
        </Col>
      </Row>

      <Row className="my-2 pb-5">
        <Col>
          <InformationCard
            lines={neighbourhoodLines}
            title='Neighbourhood'
            variant='success'
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
