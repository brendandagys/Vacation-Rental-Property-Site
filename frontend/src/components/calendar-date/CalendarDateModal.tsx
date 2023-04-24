import { Modal, Button, Container, Row } from 'react-bootstrap';
import { ICalendarDate } from '../../types/calendarDate';
import { UpdateCalendarDateForm } from './UpdateCalendarDateForm';
import { Dispatch, SetStateAction } from 'react';

interface ICalendarDateModalProps {
  datesToUpdate: ICalendarDate[];
  onUpdateCalendarDates: () => Promise<void>;
  setDatesToUpdate: Dispatch<SetStateAction<ICalendarDate[]>>;
  setShow: (show: boolean) => void;
  show: boolean;
}

export const CalendarDateModal = (
  { datesToUpdate, onUpdateCalendarDates, setDatesToUpdate, show, setShow }: ICalendarDateModalProps
) => (
  <Modal show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Manage Calendar Dates</Modal.Title>
    </Modal.Header>
    <Modal.Body>Enter the details for the selected dates to update/create them.</Modal.Body>
    <Modal.Body>
      <Container className="bg-white rounded px-4">
        <Row>
          {
            datesToUpdate.map(
              (dateToUpdate) => (
                <UpdateCalendarDateForm
                  key={dateToUpdate.ymd}
                  calendarDate={dateToUpdate}
                  setDatesToUpdate={setDatesToUpdate}
                />
              )
            )
          }
        </Row>
      </Container>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShow(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={() => void onUpdateCalendarDates()}>
        Update Calendar Dates
      </Button>
    </Modal.Footer>
  </Modal>
);
