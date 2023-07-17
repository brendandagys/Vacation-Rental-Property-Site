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
    { icon: faSun, label: 'Sunny south terrace', color: '#ff851b' },
    { icon: faWaterLadder, label: '2 outdoor pools', color: '#7fdbff' },
    { icon: faParking, label: 'Private parking', color: '' },
    { icon: faTv, label: '65" 4K smart TV', color: '' },
    { icon: faUmbrellaBeach, label: 'Beach access', color: '#ff851b' },
    { icon: faWifi, label: 'Fast Wi-Fi Internet', color: '#30aee3' },
    { icon: faSnowflake, label: 'Air conditioning', color: 'blue' },
    { icon: faFire, label: 'Central heating', color: 'red' },
    { icon: faSoap, label: 'Washing machine', color: '#2ecc40' },
    { icon: faWind, label: 'Drying machine', color: '' },
    { icon: faSpoon, label: 'Fully stocked kitchen', color: '' },
    { icon: faFireBurner, label: 'Bosch appliances', color: 'red' },
    { icon: faCoffee, label: 'Nespresso machine', color: '#311a13' },
    { icon: faCoffee, label: 'Drip coffee machine', color: '#311a13' },
    { icon: faBook, label: 'Reading materials', color: '#001f3f' },
    { icon: faUtensils, label: 'Dishes & cutlery', color: 'gray' },
  ];

  return (
    <Container>
      <Col
        xs={12}
        className='text-center text-black mb-5'
      >
        <h1>Amenities</h1>
      </Col>
      <Row className="justify-content-start">
        {
          amenities.map(({ color, icon, label }, index) => (
            <Col key={index} xs={6} sm={4} md={6} lg={4} xxl={3} className="mb-4">
              <Card className="amenity-card">
                <Card.Body className="d-flex align-items-center">
                  <FontAwesomeIcon
                    icon={icon}
                    size="2x"
                    className="mr-3 amenity-icon"
                    style={{ color: color || 'black' }}
                  />
                  <span>{label}</span>
                </Card.Body>
              </Card>
            </Col>
          ))
        }
      </Row>
    </Container>
  );
};
