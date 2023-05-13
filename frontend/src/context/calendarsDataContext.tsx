import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { IYearMonth, TCalendarsData, TMonthNumber } from '../types';
import { fetchCalendarMonths, getMonthsForRequest } from '../api/calendarsContainer';

interface ICalendarsDataContextProps {
  calendarsData: TCalendarsData;
  currentMonth: TMonthNumber;
  currentYear: number;
  fetchCalendarsData: (months: IYearMonth[]) => Promise<void>;
}

let fetchedOnce = false;

const CalendarsDataContext = createContext({} as ICalendarsDataContextProps);

export const CalendarsDataProvider = ({ children }: { children: ReactNode }) => {
  const [ calendarsData, setCalendarsData ] = useState<TCalendarsData>({});

  const fetchData = useCallback(
    async (months: IYearMonth[]) => {

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

  return (
    <CalendarsDataContext.Provider
      value={{
        calendarsData,
        currentMonth,
        currentYear,
        fetchCalendarsData: fetchData,
      }}
    >
      {children}
    </CalendarsDataContext.Provider>
  );
};

export const useCalendarsData = () => useContext(CalendarsDataContext);
