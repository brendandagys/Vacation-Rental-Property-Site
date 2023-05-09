import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {
  getDatesInRange,
  mapCalendarDateToDate,
  mapCalendarDateToYmd,
} from '../../api/calendarsContainer';
import {
  Nullable,
  TCalendarsData,
} from '../../types';
import { Calendar } from './Calendar';
import { useCalendarsData } from '../../hooks/useCalendarsData';
import { EDateState, ICalendarDate } from '../../types/calendarDate';
import { useViewportWidth } from '../../hooks/useViewportWidth';

interface ICalendarsContainerProps {
  isAdmin?: boolean;
  onDateRangeSelected?: (from: ICalendarDate, to: ICalendarDate) => void;
  providedCalendarsData?: TCalendarsData;
  setSubtotal?: Dispatch<SetStateAction<Nullable<number>>>;
}

export const CalendarsContainer = ({
  isAdmin = false,
  onDateRangeSelected,
  providedCalendarsData,
  setSubtotal,
}: ICalendarsContainerProps): JSX.Element => {
  const [ firstClick, setFirstClick ] = useState<Nullable<ICalendarDate>>(null);
  const [ secondClick, setSecondClick ] = useState<Nullable<ICalendarDate>>(null);

  const [ selectedDates, setSelectedDates ] = useState<string[]>([]);
  const [ hoveredDate, setHoveredDate ] = useState<Nullable<ICalendarDate>>(null);

  const [ showAllMonths, setShowAllMonths ] = useState(false);

  const calendarsData = providedCalendarsData || useCalendarsData().calendarsData;
  const viewportWidth = useViewportWidth();

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
        getCalendarDateForYmd(ymd)?.state === EDateState.Available
      ), [ getCalendarDateForYmd ]
    )
  );

  useEffect(
    () => {
      if (setSubtotal) {

        const selectedDatesAsCalendarDates = (
          selectedDates
            .map(getCalendarDateForYmd)
        );

        for (const date of selectedDatesAsCalendarDates) {
          if (!date) {
            setSubtotal(null);
          }
        }

        setSubtotal(
          selectedDatesAsCalendarDates
            .map((x) => x!.price) // eslint-disable-line @typescript-eslint/no-non-null-assertion
            .reduce((total, price) => total + price, 0)
        );
      }
    }, [ getCalendarDateForYmd, selectedDates, setSubtotal ]
  );

  const ymdsInHoverRange = (
    useMemo(() => {
      if (!hoveredDate || !firstClick || secondClick) {
        return [];
      }

      return (
        getDatesInRange(
          mapCalendarDateToDate(firstClick),
          mapCalendarDateToDate(hoveredDate)
        )
          .filter(() => isAdmin ? true : isYmdAvailable)
      );
    }, [ firstClick, hoveredDate, isAdmin, isYmdAvailable, secondClick ])
  );

  // Contiguous date range must contain all `Available` calendar dates
  const isValidHover = (
    ymdsInHoverRange.every((ymd) => (
      getCalendarDateForYmd(ymd)?.state === EDateState.Available)
      && ymd >= (new Date()).toISOString().slice(0, 10))
  );

  const onDateClick = (calendarDate: ICalendarDate) => {
    if (secondClick) { // Already chose a range
      setFirstClick(null);
      setSecondClick(null);
      setSelectedDates([]);
      return;
    }

    if (
      !isAdmin
      && (
        calendarDate.state !== EDateState.Available
        || (mapCalendarDateToDate(calendarDate) < new Date())
      )
    ) { return; }

    if (firstClick) { // Already chose one date
      if (firstClick === calendarDate) { // Clicks same date
        if (!isAdmin) {
          setFirstClick(null);
          setSelectedDates([]);
          return;
        }
      }

      if (!isValidHover && !isAdmin) {
        return;
      }

      setSecondClick(calendarDate);

      onDateRangeSelected?.(firstClick, calendarDate);

      const [ startDate, endDate ] = [ firstClick, calendarDate ].map(mapCalendarDateToDate);
      setSelectedDates(
        getDatesInRange(startDate, endDate)
          .filter(() => isAdmin ? true : isYmdAvailable)
      );
      return;
    }

    // Hasn't chosen anything
    setFirstClick(calendarDate);
    setSelectedDates([ mapCalendarDateToYmd(calendarDate) ]);
  };

  return (
    <Container>
      <Row className='justify-content-space-evenly'>
        {
          Object.keys(calendarsData)
            .filter((_, i) => {
              const numCalendarsToShow = (
                (viewportWidth >= 992 && viewportWidth < 1200) ? 3 : 4
              );

              return showAllMonths || i < numCalendarsToShow || isAdmin;
            })
            .map((yearMonthKey) => (
              <Col key={yearMonthKey} xs={12} sm={6} lg={4} xl={3} className='my-3'>
                <Calendar
                  dateData={calendarsData[yearMonthKey]}
                  hoveredDate={hoveredDate}
                  isAdmin={isAdmin}
                  isValidHover={isValidHover}
                  onDateClick={onDateClick}
                  selected={
                    calendarsData[yearMonthKey]
                      .filter((date) => selectedDates.includes(mapCalendarDateToYmd(date)))
                  }
                  setHoveredDate={setHoveredDate}
                  ymdsInHoverRange={
                    calendarsData[yearMonthKey]
                      .filter(
                        (date) => ymdsInHoverRange.includes(mapCalendarDateToYmd(date))
                      )
                  }
                />
              </Col>
            ))
        }
      </Row>

      <Row className='justify-content-center mt-4'>
        <Col xs='auto'>
          <button
            className='button button-blue mt-4'
            onClick={() => setShowAllMonths((old) => !old)}
          >
            {showAllMonths ? 'Show fewer months' : 'Show more months'}
          </button>
        </Col>
      </Row>
    </Container>
  );
};
