import { Row, Col } from 'react-bootstrap';
import { images } from '../static/images';
import { ImageGallery } from './ImageGallery';

export const Images = () => (
  <Row id="gallery" className="image-gallery-container pt-5 mx-0">
    <Col xs={12}><ImageGallery images={images} /></Col>
  </Row>
);
