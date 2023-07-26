import { Col, Row } from 'react-bootstrap';
import { TestimonialsContainer } from './TestimonialsContainer';
import { getText } from '../static/text';

export const Testimonials = () => (
  <Row id="testimonials" className='py-5 px-5 mx-0 justify-content-center testimonials-container'>
    <Col xs={12} className='text-center text-white mb-5'>
      <h1 className="font-5xl">
        {getText('testimonials-title')}
      </h1>
    </Col>

    <TestimonialsContainer />
  </Row>
);
