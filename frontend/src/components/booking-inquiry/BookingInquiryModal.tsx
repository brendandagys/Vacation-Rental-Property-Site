import { useState } from 'react';
import { Modal, Button, Container, Row } from 'react-bootstrap';
import { Nullable } from '../../types';
import { putBookingInquiry } from '../../api/bookingInquiry';
import { BookingInquiryForm } from './BookingInquiryForm';
import { IBookingInquiryPutRequest } from '../../types/bookingInquiry';

interface IBookingInquiryModalProps {
  setShow: (show: boolean) => void;
  show: boolean;
}

export const BookingInquiryModal = ({ show, setShow }: IBookingInquiryModalProps) => {
  const [ putRequest, setPutRequest ] = useState<Nullable<IBookingInquiryPutRequest>>(null);

  const onSubmit = async () => {
    putRequest && await putBookingInquiry(putRequest);
    setShow(false);
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Submit an Inquiry</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container className="bg-white rounded px-4">
          <Row><BookingInquiryForm setPutRequest={setPutRequest} /></Row>
        </Container>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
        <Button disabled={!putRequest} variant="primary" onClick={() => void onSubmit()}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
