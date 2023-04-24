import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import { ManageCalendarDatesContainer } from '../components/calendar-date/ManageCalendarDatesContainer';
import { ManageDefaultsContainer } from '../components/default/ManageDefaultsContainer';
import { Card } from 'react-bootstrap';

export const AdminPage = () => {

  return (
    <>
      <Container fluid='md pt-4'>
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
