import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import { ManageCalendarDatesContainer } from '../components/calendar/ManageCalendarDatesContainer';

export const AdminPage = () => {

  return (
    <>
      <Container fluid='md pt-4'>
        <Tabs defaultActiveKey="calendar-dates" className="mb-3">
          <Tab eventKey="calendar-dates" title="Calendar Dates">
            <ManageCalendarDatesContainer />
          </Tab>
          <Tab eventKey="defaults" title="Defaults">
          </Tab>
        </Tabs>
      </Container>

    </>
  );
};
