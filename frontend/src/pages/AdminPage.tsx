import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { CalendarsContainer } from '../components/calendar/CalendarsContainer';

export const AdminPage = () => (
  <Container fluid='md'>
    <Row>
      <Col xs={12}>
        <CalendarsContainer onDateRangeSelected={(from, to) => console.log({ from, to })} />
      </Col>
    </Row>
  </Container>
);
