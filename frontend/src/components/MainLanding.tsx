import { Dispatch, SetStateAction } from 'react';
import { useViewportWidth } from '../hooks/useViewportWidth';
import { mainImage, mainImageMobile } from '../static/images';

import { MainLandingForeground } from './MainLandingForeground';

interface MainLandingProps {
  setShowBookingInquiryModal: Dispatch<SetStateAction<boolean>>;
}

export const MainLanding = ({ setShowBookingInquiryModal }: MainLandingProps) => {
  const width = useViewportWidth();

  return (
    <div
      style={{
        backgroundImage: `url(${width >= 1100 ? mainImage.src : mainImageMobile.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <MainLandingForeground setShowBookingInquiryModal={setShowBookingInquiryModal} width={width} />
    </div>
  );
};
