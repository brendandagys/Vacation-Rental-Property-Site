import { Dispatch, SetStateAction } from 'react';
import { Button, Container, Modal, Row } from 'react-bootstrap';

interface IPostSubmissionModalProps {
  setShow: Dispatch<SetStateAction<boolean>>;
  show: boolean;
}

export const PostSubmissionModal = ({ show, setShow }: IPostSubmissionModalProps) => (
  <Modal show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton style={{ background: '#f0f0f0', paddingLeft: 22 }}>
      <Modal.Title>Thank you for your interest!</Modal.Title>
    </Modal.Header>

    <Modal.Body style={{ background: '#fcfcfc' }}>
      <Container className="rounded px-4">
        <Row>
          <p>We will contact you shortly with more details about your reservation.</p>
          <p className='mt-4'>You can also reach us any time at <b>spainfrontline@gmail.com</b></p>
          <p className='mt-4'>Have a great day!</p>
        </Row>
      </Container>
    </Modal.Body>

    <Modal.Footer style={{ background: '#f9f9f9' }}>
      <Button variant="primary" size='lg' onClick={() => setShow(false)}>Close</Button>
    </Modal.Footer>
  </Modal>
);
