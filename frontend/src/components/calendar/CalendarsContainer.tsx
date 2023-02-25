import { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { fetchCalendarMonths } from '../../api/calendarsContainer';
import { TCalendarMonthsRequest, TCalendarsData, TMonthNumber, TYearMonth } from '../../types';
import { Calendar } from './Calendar';

export const CalendarsContainer = (): JSX.Element => {
  const [ calendarsData, setCalendarsData ] = useState<TCalendarsData>({});
  const [ currentYear, setCurrentYear ] = useState(() => (new Date()).getFullYear());
  const [ currentMonth, setCurrentMonth ] = (
    useState<TMonthNumber>(() => (new Date()).getMonth() + 1 as TMonthNumber) // 1-based
  );

  const fetchData = useCallback(
    async (months: TCalendarMonthsRequest) => {
      const data = await fetchCalendarMonths(months);
      setCalendarsData((old) => ({ ...old, ...data }));
    }, []
  );

  const getYearMonthForDate = (date: Date): TYearMonth => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1 as TMonthNumber;

    return { year, month };
  };

  const getMonthsForRequest = (yearMonth: TYearMonth, numberAhead = 0): TCalendarMonthsRequest => {
    const { year, month } = yearMonth;
    const months = [ yearMonth ];

    for (let i = 1; i <= numberAhead; i++) {
      months.push(getYearMonthForDate(new Date(year, (month + i))));
    }

    return months;
  };

  useEffect(() => {
    const monthsToFetch = getMonthsForRequest({ year: currentYear, month: currentMonth }, 5);
    fetchData(monthsToFetch).catch(console.error);
  }, [ currentYear, currentMonth ]);

  return (
    <Container>
      <Row className='justify-content-center'>
        {
          Object.keys(calendarsData)
            .map((yearMonthKey) => (
              <Col key={yearMonthKey} xs={12} sm={6} lg={4} xl={3} className='my-3'>
                <Calendar dateData={calendarsData[yearMonthKey]} />
              </Col>
            ))
        }
      </Row>
    </Container>
  );
};
