import { useLanguage } from '../context/languageContext';
import { Container, Row, Col } from 'react-bootstrap';

export const MainDetails = () => {
  const { getText } = useLanguage();

  return (
    <div className="main-details">
      <Container>
        <Row className="justify-content-center">
          <Col lg={9}>
            {getText('main-details-text')}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
