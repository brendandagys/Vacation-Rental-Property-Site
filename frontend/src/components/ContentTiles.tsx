import { Col, Row } from 'react-bootstrap';

import { TextContainer } from './TextContainer';
import { MoreDetailsText } from './MoreDetailsText';
import { secondaryImage, tertiaryImage, upperPoolAtNightCropped } from '../static/images';
import { Amenities } from './Amenities';
import { AttractionsText } from './AttractionsText';
import { getText } from '../static/text';

export const ContentTiles = () => {
  return (
    <>
      <Row id="information" className='mx-0 details' style={{ marginTop: '5rem' }}>
        <Col
          xs={12}
          md={6}
          className="d-flex align-items-center pb-4 pt-4 px-4 px-sm-5 px-md-3 px-lg-4 px-xl-5"
        >
          <div className='font-sm text-black details__container py-3 py-sm-0'>
            <Col xs={12} className='mb-5 text-center'><h1>{getText('details-title')}</h1></Col>
            <TextContainer buttonColor='yellow'>
              <MoreDetailsText />
            </TextContainer>
          </div>
        </Col>

        <Col
          xs={12}
          md={6}
          className='p-0 d-flex align-items-center'
          style={{ background: '#2a2d38', objectFit: 'cover' }}
        >
          <img src={secondaryImage.src} width="100%" alt={secondaryImage.alt} />
        </Col>
      </Row>

      <Row className='mx-0 flex-column-reverse flex-md-row'>
        <Col
          xs={12}
          md={6}
          className='p-0 d-flex align-items-center'
          style={{ background: '#2a2d38', objectFit: 'cover' }}
        >
          <img src={tertiaryImage.src} width="100%" alt={tertiaryImage.alt} />
        </Col>

        <Col
          xs={12}
          md={6}
          className="d-flex align-items-center justify-content-center
            pb-4 pt-4 px-4 px-sm-5 px-md-3 px-lg-5"
          style={{ background: '#dc3830' }}
        >
          <div className='app__neighborhood py-3 py-sm-0'>
            <Amenities />
          </div>
        </Col>
      </Row>

      <Row id="information" className='mx-0'>
        <Col
          xs={12}
          md={6}
          className="d-flex align-items-center pb-4 pt-4 px-4 px-sm-5 px-md-4 px-lg-5"
          style={{ background: '#ffd157' }}
        >
          <div className='font-sm text-black py-3 py-sm-0'>
            <Col xs={12} className='mb-5 text-center'><h1>{getText('attractions-title')}</h1></Col>
            <TextContainer
              buttonColor='yellow'
              buttonText={(getText('attractions-more-attractions-button') || '').toString()}
            >
              <AttractionsText />
            </TextContainer>
          </div>
        </Col>

        <Col
          xs={12}
          md={6}
          className='p-0 d-flex align-items-center'
          style={{ background: '#2a2d38', objectFit: 'cover' }}
        >
          <img src={upperPoolAtNightCropped.src} width="100%" alt={upperPoolAtNightCropped.alt} />
        </Col>
      </Row>
    </>
  );
};
