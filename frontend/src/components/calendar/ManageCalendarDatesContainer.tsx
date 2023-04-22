import { Row, Col, Card } from 'react-bootstrap';
import { CalendarsContainer } from './CalendarsContainer';
import { getSpecificCalendarDates, putCalendarDates } from '../../api/calendarDate';
import { getDatesInRange, getMonthsForRequest, mapCalendarDateToDate } from '../../api/calendarsContainer';
import { useState } from 'react';
import { CalendarDateModal } from './CalendarDateModal';
import { ICalendarDate } from '../../types/calendarDate';
import { useCalendarsData } from '../../hooks/useCalendarsData';

export const ManageCalendarDatesContainer = () => {
  const [ datesToUpdate, setDatesToUpdate ] = useState<ICalendarDate[]>([]);
  const [ showModal, setShowModal ] = useState(false);

  const { calendarsData, currentMonth, currentYear, fetchCalendarsData } = useCalendarsData();

  const onDateRangeSelected = async (from: ICalendarDate, to: ICalendarDate): Promise<void> => {
    const selectedCalendarDates = (
      await getSpecificCalendarDates(
        getDatesInRange(mapCalendarDateToDate(from), mapCalendarDateToDate(to))
      )
    );

    setDatesToUpdate(selectedCalendarDates);
    setShowModal(true);
  };

  const updateCalendarDates = async () => {
    await putCalendarDates(
      datesToUpdate.map(({ state, price, cellColor, ymd, year, month, date }) =>  (
        { ymd, state, price, year, month, date, cellColor }
      ))
    );
  };

  const onUpdateCalendarDates = async () => {
    await updateCalendarDates();

    const monthsToFetch = getMonthsForRequest({ year: currentYear, month: currentMonth }, 11);
    await fetchCalendarsData(monthsToFetch);

    setShowModal(false);
  };

  return (
    <>
      <Row>
        <Col xs={12}>
          <Card className="bg-secondary">
            <CalendarsContainer
              onDateRangeSelected={
                (from: ICalendarDate, to: ICalendarDate) => void onDateRangeSelected(from, to)
              }
              providedCalendarsData={calendarsData}
            />
          </Card>
        </Col>
      </Row>

      <CalendarDateModal
        datesToUpdate={datesToUpdate}
        onUpdateCalendarDates={onUpdateCalendarDates}
        setDatesToUpdate={setDatesToUpdate}
        show={showModal}
        setShow={setShowModal}
      />
    </>
  );
};
