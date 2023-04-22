import { useState, useCallback, useEffect } from 'react';
import { fetchCalendarMonths, getMonthsForRequest } from '../api/calendarsContainer';
import { TCalendarsData, TCalendarMonthsRequest, TMonthNumber } from '../types';

let fetchedOnce = false;

export const useCalendarsData = () => {
  const [ calendarsData, setCalendarsData ] = useState<TCalendarsData>({});

  const fetchData = useCallback(
    async (months: TCalendarMonthsRequest) => {

      setCalendarsData(await fetchCalendarMonths(months));
    }, []
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
  }, [ currentMonth, currentYear, fetchData ]);

  return { calendarsData, fetchCalendarsData: fetchData, currentYear, currentMonth };
};
