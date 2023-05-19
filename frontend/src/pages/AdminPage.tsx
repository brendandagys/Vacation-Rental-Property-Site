import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import { ManageCalendarDatesContainer } from '../components/calendar-date/ManageCalendarDatesContainer';
import { ManageDefaultsContainer } from '../components/default/ManageDefaultsContainer';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNav } from '../context/navContext';
import { logOut } from '../api/authentication';

export const AdminPage = () => {
  const { setPath } = useNav();

  return (
    <>
      <Container fluid='md pt-4'>
        <Row>
          <Col className='mb-3 d-flex justify-content-between'>
            <Button
              className='font-lg'
              variant='warning'
              onClick={() => { setPath('/'); }}
            >
              Home
            </Button>

            <Button
              className='font-lg py-2 px-4'
              variant='danger'
              onClick={() => {
                logOut();
                setPath('/log-in');
              }}
            >
              Log out
            </Button>
          </Col>
        </Row>
        <Card className='p-3 pb-4'>
          <Tabs defaultActiveKey="defaults" className="mb-3">
            <Tab eventKey="calendar-dates" title="Calendar Dates">
              <ManageCalendarDatesContainer />
            </Tab>
            <Tab eventKey="defaults" title="Defaults">
              <ManageDefaultsContainer />
            </Tab>
          </Tabs>
        </Card>
      </Container>
    </>
  );
};
