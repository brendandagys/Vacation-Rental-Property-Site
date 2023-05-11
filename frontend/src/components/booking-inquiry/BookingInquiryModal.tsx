import { useState } from 'react';
import { Modal, Button, Container, Row } from 'react-bootstrap';
import { Nullable } from '../../types';
import { putBookingInquiry } from '../../api/bookingInquiry';
import { BookingInquiryForm } from './BookingInquiryForm';
import { IBookingInquiryPutRequest } from '../../types/bookingInquiry';

interface IBookingInquiryModalProps {
  fromTo: Nullable<string>;
  numDatesSelected: number;
  setShow: (show: boolean) => void;
  show: boolean;
  subtotal: Nullable<number>;
}

export const BookingInquiryModal = ({
  fromTo,
  numDatesSelected,
  setShow,
  show,
  subtotal,
}: IBookingInquiryModalProps) => {
  const [ putRequest, setPutRequest ] = useState<Nullable<IBookingInquiryPutRequest>>(null);

  const onSubmit = async () => {
    putRequest && await putBookingInquiry(putRequest);
    setShow(false);
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton style={{ background: '#f0f0f0', paddingLeft: 22 }}>
        <Modal.Title>Submit an Inquiry</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ background: '#fcfcfc' }}>
        <Container className="rounded px-4">
          <Row>
            <BookingInquiryForm
              fromTo={fromTo}
              numDatesSelected={numDatesSelected}
              setPutRequest={setPutRequest}
              subtotal={subtotal}
            />
          </Row>
        </Container>
      </Modal.Body>

      <Modal.Footer style={{ background: '#f9f9f9' }}>
        <Button variant="secondary" size='lg' onClick={() => setShow(false)}>Cancel</Button>
        <Button disabled={!putRequest} variant="primary" size='lg' onClick={() => void onSubmit()}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
