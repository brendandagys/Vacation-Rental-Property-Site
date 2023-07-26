import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Nullable } from '../types';
import { Col } from 'react-bootstrap';
import { FadeInImage } from './FadeInImage';
import { useViewportWidth } from '../hooks/useViewportWidth';
import { getText } from '../static/text';

interface ImageGalleryProps {
  images: { src: string; alt: string; }[];
}

export const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [slideNumber, setSlideNumber] = useState<Nullable<number>>(null);
  const [showModal, setShowModal] = useState(false);

  const width = useViewportWidth();

  return (
    <div>
      <Col xs={12} className='text-center text-black mb-5'>
        <h1 className="font-5xl">{getText('gallery-title')}</h1>
      </Col>
      <br />
      {
        showModal && (
          <div className="slider-wrap" onClick={() => { setShowModal(false); }}>
            <FontAwesomeIcon
              size={width < 400 ? '2x' : '3x'}
              icon={faCircleXmark}
              className='btn-close'
              onClick={() => setShowModal(false)}
            />
            <FontAwesomeIcon
              size={width < 400 ? '2x' : '3x'}
              icon={faCircleChevronLeft}
              className='btn-previous'
              onClick={(e) => {
                e.stopPropagation();

                setSlideNumber((old) => (
                  old !== null
                    ? old === 0 ? images.length - 1 : old - 1
                    : old
                ));
              }}
            />
            <FontAwesomeIcon
              size={width < 400 ? '2x' : '3x'}
              icon={faCircleChevronRight}
              className='btn-next'
              onClick={(e) => {
                e.stopPropagation();

                setSlideNumber((old) => (
                  old !== null ?
                    old === images.length - 1 ? 0 : old + 1
                    : old
                ));
              }}
            />

            <div className="fullscreen">
              <img src={images[slideNumber ?? 0].src} alt={images[slideNumber ?? 0].alt} />
            </div>
          </div>
        )
      }

      <div className='gallery-wrap'>
        {
          images.map(({ src, alt }, i) => (
            <div
              className="single"
              key={src}
              onClick={() => {
                setSlideNumber(i);
                setShowModal(true);
              }}
            >
              <FadeInImage src={src} alt={alt} />
            </div>
          ))
        }
      </div>
    </div>
  );
};
