import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import {
  fetchCalendarMonths,
  getDatesInRange,
  getMonthsForRequest,
  mapCalendarDateToDate,
  mapCalendarDateToString,
} from '../../api/calendarsContainer';
import {
  ECalendarDateState,
  ICalendarDate,
  TCalendarMonthsRequest,
  TCalendarsData,
  TMonthNumber,
} from '../../types';
import { makeYmd } from '../../utils/helpers';
import { Calendar } from './Calendar';

export const CalendarsContainer = (): JSX.Element => {
  const [ calendarsData, setCalendarsData ] = useState<TCalendarsData>({});
  const [ currentYear, setCurrentYear ] = useState(() => (new Date()).getFullYear());
  const [ currentMonth, setCurrentMonth ] = (
    useState<TMonthNumber>(() => (new Date()).getMonth() + 1 as TMonthNumber) // 1-based
  );
  const [ firstClick, setFirstClick ] = useState<ICalendarDate | null>(null);
  const [ secondClick, setSecondClick ] = useState<ICalendarDate | null>(null);

  const [ selectedDates, setSelectedDates ] = useState<string[]>([]);
  const [ hoveredDate, setHoveredDate ] = useState<ICalendarDate | null>(null);

  const [ currencySymbol ] = useState('€');

  const dateRange = (
    useMemo(
      () => {
        let from = null;
        let to = null;

        if (secondClick && firstClick) {
          if (mapCalendarDateToDate(firstClick) < mapCalendarDateToDate(secondClick)) {
            from = firstClick;
            to = secondClick;
          } else {
            from = secondClick;
            to = firstClick;
          }
        } else if (firstClick) {
          from = firstClick;
        }

        return { from, to };
      },
      [ firstClick, secondClick ]
    )
  );

  const getCalendarDateForYmd = (ymd: string): ICalendarDate | null => {
    const [ year, month, date ] = ymd.split('-');
    return (
      calendarsData[`${year}-${month}`]
        ?.find(({ date: foundDate }) => (
          foundDate === parseInt(date)
        ))
        ?? null
    );
  };

  const isYmdAvailable = (ymd: string): boolean => (
    getCalendarDateForYmd(ymd)?.state === ECalendarDateState.available
  );

  const subtotal = (
    useMemo(() => (
      selectedDates
        .map(getCalendarDateForYmd)
        .filter((calendarDate) => calendarDate?.state === ECalendarDateState.available)
        .map((x) => x!.price)
        .reduce((acc, dateAmount) => acc + dateAmount, 0)
    ), [ selectedDates ])
  );

  const fetchData = useCallback(
    async (months: TCalendarMonthsRequest) => {
      const data = await fetchCalendarMonths(months);
      setCalendarsData((old) => ({ ...old, ...data }));
    }, []
  );

  const datesInHoverRange = (
    useMemo(() => {
      if (!hoveredDate || !firstClick || secondClick) {
        return [];
      }

      return (
        getDatesInRange(
          mapCalendarDateToDate(firstClick),
          mapCalendarDateToDate(hoveredDate)
        )
          .filter(isYmdAvailable)
      );
    }, [ hoveredDate, firstClick, secondClick ])
  );

  const onDateClick = (calendarDate: ICalendarDate) => {
    // Already chose a range
    if (secondClick) {
      setFirstClick(null);
      setSecondClick(null);
      setSelectedDates([]);
      return;
    }

    // Already chose one date
    if (firstClick) {
      if (firstClick === calendarDate) {
        setFirstClick(null);
        setSelectedDates([]);
        return;
      }
      
      if (calendarDate.state !== ECalendarDateState.available) {
        return;
      }
      setSecondClick(calendarDate);
      const [ startDate, endDate ] = [ firstClick, calendarDate ].map(mapCalendarDateToDate);
      setSelectedDates(
        getDatesInRange(startDate, endDate)
          .filter(isYmdAvailable)
      );
      return;
    }

    // Haven't chosen anything
    if (calendarDate.state === ECalendarDateState.available) {
      setFirstClick(calendarDate);
      setSelectedDates([ mapCalendarDateToString(calendarDate) ]);
    }
  };

  useEffect(() => {
    const monthsToFetch = getMonthsForRequest({ year: currentYear, month: currentMonth }, 5);
    fetchData(monthsToFetch).catch(console.error);
  }, [ currentYear, currentMonth ]);

  const getCalendarDateYmd = (calendarDate: ICalendarDate) => {
    const { year, month, date } = calendarDate;
    if (year && month && date) {
      return makeYmd(year, month, date);
    }

    return '';
  };

  return (
    <Container>
      <Row>
        <Col className='mx-auto' xs={8} sm={6} md={5} lg={4} xl={3}>
          <Alert className='border-white'>
            <h5 className='calendars-container__subtotal'>Subtotal: {currencySymbol}{subtotal}</h5>
          </Alert>
        </Col>
      </Row>
      <Row className='justify-content-center calendars-container__date-range'>
        <Col xs={5} sm={4} lg={3} xl={2}>
          <Alert className='border-white'>
            <h5>From: {dateRange.from ? getCalendarDateYmd(dateRange.from) : ''}</h5>
          </Alert>
        </Col>
        <Col xs={5} sm={4} lg={3} xl={2}>
          <Alert className='border-white'>
            <h5>
              To: {dateRange.to ? getCalendarDateYmd(dateRange.to) : ''}
            </h5>
          </Alert>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        {
          Object.keys(calendarsData)
            .map((yearMonthKey) => (
              <Col key={yearMonthKey} xs={12} sm={6} lg={4} xl={3} className='my-3'>
                <Calendar
                  dateData={calendarsData[yearMonthKey]}
                  inHoverRange={
                    calendarsData[yearMonthKey]
                      .filter((date) => datesInHoverRange.includes(mapCalendarDateToString(date)))
                  }
                  onDateClick={onDateClick}
                  selected={
                    calendarsData[yearMonthKey]
                      .filter((date) => selectedDates.includes(mapCalendarDateToString(date)))
                  }
                  setHoveredDate={setHoveredDate}
                />
              </Col>
            ))
        }
      </Row>
    </Container>
  );
};
