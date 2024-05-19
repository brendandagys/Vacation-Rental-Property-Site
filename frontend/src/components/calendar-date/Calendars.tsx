import { Col, Container, Row } from 'react-bootstrap';
import { CalendarsContainer } from './CalendarsContainer';
import { getDatesInRange, mapCalendarDateToDate, mapCalendarDateToYmd } from '../../api/calendarsContainer';
import { Dispatch, SetStateAction } from 'react';
import { Nullable } from '../../types';
import { useLanguage } from '../../context/languageContext';

interface CalendarsProps {
  setFromTo: Dispatch<SetStateAction<Nullable<string>>>;
  setNumDatesSelected: Dispatch<SetStateAction<number>>;
  setShowBookingInquiryModal: Dispatch<SetStateAction<boolean>>;
  setSubtotal: Dispatch<SetStateAction<Nullable<number>>>;
}

export const Calendars = ({
  setFromTo,
  setNumDatesSelected,
  setShowBookingInquiryModal,
  setSubtotal,
}: CalendarsProps) => {
  const { getText } = useLanguage();

  return (
    <Container>
      {
        window.location.pathname !== '/admin' && (
          <Row id="calendar" className='mt-5'>
            <Col xs={12}>
              <div className="calendars__titles text-center mb-5">
                <h1 className="text-black font-5xl">{getText('calendar-title')}</h1>
                <p className='font-sm mt-4'>{getText('calendar-subtitle')}</p>
              </div>

              <CalendarsContainer
                onDateRangeCleared={() => { setFromTo(null); setNumDatesSelected(0); }}
                onDateRangeSelected={
                  (from, to) => {
                    setFromTo(`${mapCalendarDateToYmd(from)} - ${mapCalendarDateToYmd(to)}`);
                    setNumDatesSelected(
                      Math.max(
                        1,
                        getDatesInRange(mapCalendarDateToDate(from), mapCalendarDateToDate(to)).length - 1
                      )
                    );
                    setShowBookingInquiryModal(true);
                  }
                }
                setSubtotal={setSubtotal}
              />
            </Col>
          </Row>
        )
      }
    </Container>
  );
};
