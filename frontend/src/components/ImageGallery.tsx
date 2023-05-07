import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Nullable } from '../types';
import { Col } from 'react-bootstrap';

interface ImageGalleryProps {
  images: string[];
}

export const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [ slideNumber, setSlideNumber ] = useState<Nullable<number>>(null);
  const [ showModal, setShowModal ] = useState(false);

  return (
    <div>
      <Col xs={12} className='text-center text-white mb-5'><h1 className='font-5xl'>Gallery</h1></Col>
      <br />
      {
        showModal && (
          <div className="slider-wrap" onClick={() => { setShowModal(false); }}>
            <FontAwesomeIcon icon={faCircleXmark} className='btn-close' onClick={() => setShowModal(false)} />
            <FontAwesomeIcon icon={faCircleChevronLeft} className='btn-previous' onClick={(e) => {
              e.stopPropagation();

              setSlideNumber((old) => (
                old !== null
                  ? old === 0 ? images.length - 1 : old - 1
                  : old
              ));
            }} />
            <FontAwesomeIcon icon={faCircleChevronRight} className='btn-next' onClick={(e) => {
              e.stopPropagation();

              setSlideNumber((old) => (
                old !== null ?
                  old === images.length - 1 ? 0 : old + 1
                  : old
              ));
            }} />

            <div className="fullscreen"><img src={images[slideNumber ?? 0]} alt='' /></div>
          </div>
        )
      }

      <div className='gallery-wrap'>
        {
          images.map((image, i) => (
            <div
              className="single"
              key={i}
              onClick={() => {
                setSlideNumber(i);
                setShowModal(true);
              }}
            >
              <img src={image} alt='' />
            </div>
          ))
        }
      </div>
    </div>
  );
};
