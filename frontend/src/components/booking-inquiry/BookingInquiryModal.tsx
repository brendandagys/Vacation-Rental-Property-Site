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
  setShowPostSubmissionModal: (show: boolean) => void;
  show: boolean;
  subtotal: Nullable<number>;
}

export const BookingInquiryModal = ({
  fromTo,
  numDatesSelected,
  setShow,
  setShowPostSubmissionModal,
  show,
  subtotal,
}: IBookingInquiryModalProps) => {
  const [ putRequest, setPutRequest ] = useState<Nullable<IBookingInquiryPutRequest>>(null);

  const onSubmit = async () => {
    putRequest && await putBookingInquiry(putRequest);
    setShow(false);
    setShowPostSubmissionModal(true);
  };

  return (
    <Modal centered show={show} onHide={() => setShow(false)}>
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
        <Button
          className='font-lg py-2 px-4'
          onClick={() => setShow(false)}
          variant="secondary"
        >Cancel</Button>

        <Button
          className='font-lg py-2 px-4'
          disabled={!putRequest}
          onClick={() => void onSubmit()}
          variant="primary"
        >Send</Button>
      </Modal.Footer>
    </Modal>
  );
};
