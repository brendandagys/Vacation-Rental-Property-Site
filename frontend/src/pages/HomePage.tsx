import { useState } from 'react';

import { BookingInquiryModal } from '../components/booking-inquiry/BookingInquiryModal';
import { PostSubmissionModal } from '../components/booking-inquiry/PostSubmissionModal';
import { Nullable } from '../types';
import { Navbar } from '../components/Navbar';
import { Video } from '../components/Video';
import { ContentTiles } from '../components/ContentTiles';
import { Calendars } from '../components/calendar-date/Calendars';
import { Footer } from '../components/footer/Footer';
import { Testimonials } from '../components/Testimonials';
import { Images } from '../components/Images';
import { MainDetails } from '../components/MainDetails';
import { MainLanding } from '../components/MainLanding';

export const HomePage = () => {
  const [fromTo, setFromTo] = useState<Nullable<string>>(null);
  const [numDatesSelected, setNumDatesSelected] = useState(0);
  const [subtotal, setSubtotal] = useState<Nullable<number>>(null);

  const [showBookingInquiryModal, setShowBookingInquiryModal] = useState(false);
  const [showPostSubmissionModal, setShowPostSubmissionModal] = useState(false);

  return (
    <div id="home" className="overflow-visible">
      <Navbar />

      <MainLanding setShowBookingInquiryModal={setShowBookingInquiryModal} />

      <MainDetails />

      <Video />

      <Calendars
        setFromTo={setFromTo}
        setNumDatesSelected={setNumDatesSelected}
        setShowBookingInquiryModal={setShowBookingInquiryModal}
        setSubtotal={setSubtotal}
      />

      <ContentTiles />

      <Images />

      <Testimonials />

      <Footer />

      <BookingInquiryModal
        fromTo={fromTo}
        numDatesSelected={numDatesSelected}
        setShow={setShowBookingInquiryModal}
        setShowPostSubmissionModal={setShowPostSubmissionModal}
        show={showBookingInquiryModal}
        subtotal={subtotal}
      />

      <PostSubmissionModal
        setShow={setShowPostSubmissionModal}
        show={showPostSubmissionModal}
      />
    </div>
  );
};
