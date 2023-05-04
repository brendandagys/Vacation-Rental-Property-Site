import { Row, Col, Card } from 'react-bootstrap';
import { CalendarsContainer } from './CalendarsContainer';
import { getMonthsForRequest } from '../../api/calendarsContainer';
import { useState } from 'react';
import { CalendarDateModal } from './UpdateCalendarDateModal';
import { ICalendarDate } from '../../types/calendarDate';
import { useCalendarsData } from '../../hooks/useCalendarsData';
import { getPartsFromYmd, makeYmd } from '../../utils/helpers';
import { getCalendarDatesInDateRange, putCalendarDates } from '../../api/calendarDate';
import { TDateNumber, TMonthNumber } from '../../types';

// TODO: Delete this when helper function is updated
const mapCalendarDateToYmd = ({ year, month, date }: ICalendarDate): string => (
  makeYmd(year, month as TMonthNumber, date as TDateNumber)
);

export const ManageCalendarDatesContainer = () => {
  const [ datesToUpdate, setDatesToUpdate ] = useState<ICalendarDate[]>([]);
  const [ showModal, setShowModal ] = useState(false);

  const { calendarsData, currentMonth, currentYear, fetchCalendarsData } = useCalendarsData();

  const onDateRangeSelected = async (from: ICalendarDate, to: ICalendarDate): Promise<void> => {
    const selectedCalendarDates = (
      await getCalendarDatesInDateRange(
        getPartsFromYmd(mapCalendarDateToYmd(from)),
        getPartsFromYmd(mapCalendarDateToYmd(to))
      )
    );

    setDatesToUpdate(selectedCalendarDates);
    setShowModal(true);
  };

  const updateCalendarDates = async () => {
    const result = await putCalendarDates(
      datesToUpdate.map(({ state, price, cellColor, ymd, year, month, date }) =>  (
        { ymd, state, price, year, month, date, cellColor }
      ))
    );

    console.log('`updateCalendarDates()` result:', result);
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
              isAdmin={true}
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
