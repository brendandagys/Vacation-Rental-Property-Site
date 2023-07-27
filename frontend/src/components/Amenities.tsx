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
import { useLanguage } from '../context/languageContext';

export const Amenities = () => {
  const { getText } = useLanguage();

  const amenities = [
    { icon: faSun, label: getText('amenities-terrace'), color: '#ff851b' },
    { icon: faWaterLadder, label: getText('amenities-pools'), color: '#7fdbff' },
    { icon: faParking, label: getText('amenities-parking'), color: '' },
    { icon: faTv, label: getText('amenities-smart-tv'), color: '' },
    { icon: faUmbrellaBeach, label: getText('amenities-beach'), color: '#ff851b' },
    { icon: faWifi, label: getText('amenities-internet'), color: '#30aee3' },
    { icon: faSnowflake, label: getText('amenities-air-conditioning'), color: 'blue' },
    { icon: faFire, label: getText('amenities-central-heating'), color: 'red' },
    { icon: faSoap, label: getText('amenities-washing-machine'), color: '#2ecc40' },
    { icon: faWind, label: getText('amenities-drying-machine'), color: '' },
    { icon: faSpoon, label: getText('amenities-kitchen'), color: '' },
    { icon: faFireBurner, label: getText('amenities-bosch-appliances'), color: 'red' },
    { icon: faCoffee, label: getText('amenities-nespresso'), color: '#311a13' },
    { icon: faCoffee, label: getText('amenities-coffee'), color: '#311a13' },
    { icon: faBook, label: getText('amenities-reading-materials'), color: '#001f3f' },
    { icon: faUtensils, label: getText('amenities-dishes-and-cutlery'), color: 'gray' },
  ];

  return (
    <Container>
      <Col
        xs={12}
        className='text-center text-black mb-5'
      >
        <h1>{getText('amenities-title')}</h1>
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
