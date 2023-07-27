import { Dispatch, SetStateAction } from 'react';
import { Button, Container, Modal, Row } from 'react-bootstrap';
import { useLanguage } from '../../context/languageContext';

interface IPostSubmissionModalProps {
  setShow: Dispatch<SetStateAction<boolean>>;
  show: boolean;
}

export const PostSubmissionModal = ({ show, setShow }: IPostSubmissionModalProps) => {
  const { getText } = useLanguage();

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton style={{ background: '#f0f0f0', paddingLeft: 22 }}>
        <Modal.Title>{getText('post-submission-modal-1')}</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ background: '#fcfcfc' }}>
        <Container className="rounded px-4">
          <Row>
            <p>{getText('post-submission-modal-2')}</p>
            <p className='mt-4'>{getText('post-submission-modal-3')} <b>spainfrontline@gmail.com</b></p>
            <p className='mt-4'>{getText('post-submission-modal-4')}</p>
          </Row>
        </Container>
      </Modal.Body>

      <Modal.Footer style={{ background: '#f9f9f9' }}>
        <Button className='font-lg py-2 px-4' variant="primary" onClick={() => setShow(false)}>
          {getText('post-submission-modal-close-button')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
