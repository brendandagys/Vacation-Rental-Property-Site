import { useState, useCallback, useEffect } from 'react';
import { fetchCalendarMonths, getMonthsForRequest } from '../api/calendarsContainer';
import { TCalendarsData, TCalendarMonthsRequest, TMonthNumber } from '../types';
import { makeYm } from '../utils/helpers';

let fetchedOnce = false;

export const useCalendarsData = () => {
  const [ calendarsData, setCalendarsData ] = useState<TCalendarsData>({});

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

      setCalendarsData(data);
    }, [ calendarsData ]
  );

  const [ currentYear ] = useState(() => (new Date()).getFullYear());
  const [ currentMonth ] = (
    useState<TMonthNumber>(() => (new Date()).getMonth() + 1 as TMonthNumber) // 1-based
  );

  useEffect(() => {
    if (!fetchedOnce) {
      fetchedOnce = true;

      const monthsToFetch = getMonthsForRequest({ year: currentYear, month: currentMonth }, 11);
      fetchData(monthsToFetch).catch(console.error);
    }
  }, [ currentYear, currentMonth, fetchData ]);

  return calendarsData;
};
