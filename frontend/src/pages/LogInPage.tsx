import { Button, Col, Container, Row } from 'react-bootstrap';
import { LogInForm } from '../components/LoginForm';
import { useNav } from '../context/navContext';

export const LogInPage = () => {
  const { setPath } = useNav();

  return (
    <Container className="p-4 mt-3">
      <Row className="justify-content-center">
        <Col>
          <Button
            variant='warning'
            onClick={() => { setPath('/'); }}
          >
            Home
          </Button>
        </Col>
      </Row>

      <Row className='justify-content-center'>
        <Col xs={10} sm={8} md={6} lg={4} xl={3}>
          <div className="bg-white rounded p-4 mt-5">
            <LogInForm />
          </div>
        </Col>
      </Row>
    </Container>
  );
};
