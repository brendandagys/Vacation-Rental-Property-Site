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
  Nullable,
  TCalendarMonthsRequest,
  TCalendarsData,
  TMonthNumber,
} from '../../types';
import { makeYm, makeYmd } from '../../utils/helpers';
import { Calendar } from './Calendar';
import { DEFAULT_PRICE } from '../../utils/constants';

interface ICalendarsContainerProps {
  onDateRangeSelected?: (from: ICalendarDate, to: ICalendarDate) => void;
}

let fetchedOnce = false;

export const CalendarsContainer = ({ onDateRangeSelected }: ICalendarsContainerProps): JSX.Element => {
  const [ calendarsData, setCalendarsData ] = useState<TCalendarsData>({});
  const [ currentYear ] = useState(() => (new Date()).getFullYear());
  const [ currentMonth ] = (
    useState<TMonthNumber>(() => (new Date()).getMonth() + 1 as TMonthNumber) // 1-based
  );
  const [ firstClick, setFirstClick ] = useState<Nullable<ICalendarDate>>(null);
  const [ secondClick, setSecondClick ] = useState<Nullable<ICalendarDate>>(null);

  const [ selectedDates, setSelectedDates ] = useState<string[]>([]);
  const [ hoveredDate, setHoveredDate ] = useState<Nullable<ICalendarDate>>(null);

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

        from && to && onDateRangeSelected?.(from, to);

        return { from, to };
      },
      [ firstClick, secondClick ] // eslint-disable-line react-hooks/exhaustive-deps
    )
  );

  const getCalendarDateForYmd = (
    useCallback(
      (ymd: string): Nullable<ICalendarDate> => {
        const [ year, month, date ] = ymd.split('-');
        return (
          calendarsData[`${year}-${month}`]
            ?.find(({ date: foundDate }) => (
              foundDate === parseInt(date)
            ))
        ?? null
        );
      }, [ calendarsData ]
    )
  );

  const isYmdAvailable = (
    useCallback(
      (ymd: string): boolean => (
        getCalendarDateForYmd(ymd)?.state === ECalendarDateState.available
      ), [ getCalendarDateForYmd ]
    )
  );

  const subtotal = (
    useMemo(() => (
      selectedDates
        .map(getCalendarDateForYmd)
        .filter((calendarDate) => calendarDate?.state === ECalendarDateState.available)
        .map((x) => x?.price ?? DEFAULT_PRICE)
        .reduce((acc, dateAmount) => acc + dateAmount, 0)
    ), [ getCalendarDateForYmd, selectedDates ])
  );

  const fetchData = useCallback(
    async (months: TCalendarMonthsRequest) => {
      const data = (
        await fetchCalendarMonths(
          months.filter(
            ({ year, month }) => {
              return !Object.keys(calendarsData).includes(makeYm(year, month));
            }
          )
        )
      );

      setCalendarsData((old) => {
        return { ...old, ...data };
      });
    }, [ calendarsData ]
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
    }, [ firstClick, hoveredDate, isYmdAvailable, secondClick ])
  );

  const onDateClick = (calendarDate: ICalendarDate) => {
    if (secondClick) { // Already chose a range
      setFirstClick(null);
      setSecondClick(null);
      setSelectedDates([]);
      return;
    }

    if (
      calendarDate.state !== ECalendarDateState.available
      || (mapCalendarDateToDate(calendarDate) < new Date())
    ) {
      return;
    }

    if (firstClick) { // Already chose one date
      if (firstClick === calendarDate) { // Clicks same date
        setFirstClick(null);
        setSelectedDates([]);
        return;
      }

      setSecondClick(calendarDate);
      const [ startDate, endDate ] = [ firstClick, calendarDate ].map(mapCalendarDateToDate);
      setSelectedDates(
        getDatesInRange(startDate, endDate).filter(isYmdAvailable)
      );
      return;
    }
    // Hasn't chosen anything
    setFirstClick(calendarDate);
    setSelectedDates([ mapCalendarDateToString(calendarDate) ]);
  };

  useEffect(() => {
    if (!fetchedOnce) {
      fetchedOnce = true;
      const monthsToFetch = getMonthsForRequest({ year: currentYear, month: currentMonth }, 11);
      fetchData(monthsToFetch).catch(console.error);
    }
  }, [ currentYear, currentMonth, fetchData ]);

  const getCalendarDateYmd = (calendarDate: ICalendarDate) => {
    const { year, month, date } = calendarDate;
    if (year && month && date) {
      return makeYmd(year, month, date);
    }

    return '';
  };

  return (
    <Container>
      {
        dateRange.to &&
        <Row>
          <Col className='mx-auto' xs={8} sm={6} md={5} lg={3}>
            <Alert className='border-white text-center'>
              <h5 className='calendars-container__subtotal'>Subtotal: {currencySymbol}{subtotal}</h5>
            </Alert>
          </Col>
        </Row>
      }
      {
        dateRange.to &&
        <Row className='justify-content-center'>
          <Col xs={5} sm={4} lg={2}>
            <Alert className='border-white text-center'>
              <h5>From: {dateRange.from ? getCalendarDateYmd(dateRange.from) : ''}</h5>
            </Alert>
          </Col>
          <Col xs={5} sm={4} lg={2}>
            <Alert className='border-white text-center'>
              <h5>
                  To: {dateRange.to ? getCalendarDateYmd(dateRange.to) : ''}
              </h5>
            </Alert>
          </Col>
        </Row>
      }
      <Row className='justify-content-space-evenly'>
        {
          Object.keys(calendarsData)
            .map((yearMonthKey) => (
              <Col key={yearMonthKey} xs={12} sm={6} lg={4} xl={3} className='my-3'>
                <Calendar
                  dateData={calendarsData[yearMonthKey]}
                  hoveredDate={hoveredDate}
                  datesInHoverRange={
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
