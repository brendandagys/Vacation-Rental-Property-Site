import { Container, Row, Col } from 'react-bootstrap';
import { MainDetailsText } from './MainDetailsText';

export const MainDetails = () => (
  <div className="app__description">
    <Container>
      <Row className="justify-content-center">
        <Col lg={9}>
          <MainDetailsText />
        </Col>
      </Row>
    </Container>
  </div>
);
