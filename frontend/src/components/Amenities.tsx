import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFire,
  faKitchenSet,
  faSnowflake,
  faCoffee,
  faTv,
  faUtensils,
  faSink,
  faWifi,
  faWaterLadder,
  faSun,
  faParking,
  faUmbrellaBeach,
} from '@fortawesome/free-solid-svg-icons';

export const Amenities = () => {
  const amenities = [
    { icon: faSun, label: 'Sea-facing terrace' },
    { icon: faWaterLadder, label: '2 Outdoor pools' },
    { icon: faParking, label: 'Private parking' },
    { icon: faSnowflake, label: 'A/C' },
    { icon: faWifi, label: 'Wi-Fi' },
    { icon: faSink, label: 'Dishwasher' },
    { icon: faUtensils, label: 'Dishes/cutlery' },
    { icon: faKitchenSet, label: 'Cooking basics' },
    { icon: faCoffee, label: 'Two coffee machines' },
    { icon: faTv, label: 'Large Smart TV' },
    { icon: faFire, label: 'Heating' },
    { icon: faUmbrellaBeach, label: 'Beach access' },
  ];

  return (
    <Container>
      <Col xs={12} className='text-center text-white mb-5'><h1>Amenities</h1></Col>
      <Row className="justify-content-center">
        {
          amenities.map((amenity, index) => (
            <Col key={index} xs={6} sm={4} md={6} lg={4} xl={3} className="mb-4">
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
