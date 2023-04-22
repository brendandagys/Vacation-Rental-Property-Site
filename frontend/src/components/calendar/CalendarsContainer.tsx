import { useCallback, useMemo, useState } from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import {
  getDatesInRange,
  mapCalendarDateToDate,
  mapCalendarDateToString,
} from '../../api/calendarsContainer';
import {
  ECalendarDateState,
  ICalendarDate,
  Nullable,
} from '../../types';
import {  makeYmd } from '../../utils/helpers';
import { Calendar } from './Calendar';
import { DEFAULT_PRICE } from '../../utils/constants';
import { useCalendarsData } from '../../hooks/useCalendarsData';

interface ICalendarsContainerProps {
  onDateRangeSelected?: (from: ICalendarDate, to: ICalendarDate) => void;
}

export const CalendarsContainer = ({
  onDateRangeSelected,
}: ICalendarsContainerProps): JSX.Element => {
  const [ firstClick, setFirstClick ] = useState<Nullable<ICalendarDate>>(null);
  const [ secondClick, setSecondClick ] = useState<Nullable<ICalendarDate>>(null);

  const [ selectedDates, setSelectedDates ] = useState<string[]>([]);
  const [ hoveredDate, setHoveredDate ] = useState<Nullable<ICalendarDate>>(null);

  const [ currencySymbol ] = useState('€');

  const calendarsData = useCalendarsData();

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
