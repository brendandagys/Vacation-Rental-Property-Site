import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faCoffee,
  faFire,
  faFireBurner,
  faParking,
  faSnowflake,
  faSoap,
  faSpoon,
  faSun,
  faTv,
  faUmbrellaBeach,
  faUtensils,
  faWaterLadder,
  faWifi,
  faWind,
} from '@fortawesome/free-solid-svg-icons';

export const Amenities = () => {
  const amenities = [
    { icon: faSun, label: 'Sunny south terrace' },
    { icon: faWaterLadder, label: '2 outdoor pools' },
    { icon: faParking, label: 'Private parking' },
    { icon: faTv, label: '65" 4K smart TV' },
    { icon: faUmbrellaBeach, label: 'Beach access' },
    { icon: faWifi, label: 'Fast Wi-Fi Internet' },
    { icon: faSnowflake, label: 'Air conditioning' },
    { icon: faFire, label: 'Central heating' },
    { icon: faSoap, label: 'Washing machine' },
    { icon: faWind, label: 'Drying machine' },
    { icon: faSpoon, label: 'Fully stocked kitchen' },
    { icon: faFireBurner, label: 'Bosch appliances' },
    { icon: faCoffee, label: 'Nespresso machine' },
    { icon: faCoffee, label: 'Drip coffee machine' },
    { icon: faBook, label: 'Reading materials' },
    { icon: faUtensils, label: 'Dishes & cutlery' },
  ];

  return (
    <Container>
      <Col xs={12} className='text-center text-black mb-5'><h1>Amenities</h1></Col>
      <Row className="justify-content-start">
        {
          amenities.map((amenity, index) => (
            <Col key={index} xs={6} sm={4} md={6} lg={4} xxl={3} className="mb-4">
              <Card className="amenity-card">
                <Card.Body className="d-flex align-items-center">
                  <FontAwesomeIcon icon={amenity.icon} size="2x" className="mr-3 amenity-icon" />
                  <span>{amenity.label}</span>
                </Card.Body>
              </Card>
            </Col>
          ))
        }
      </Row>
    </Container>
  );
};
