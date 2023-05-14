import {
  IYearMonth,
  TCalendarsData,
  TDateNumber,
  TMonthNumber,
} from '../types';
import { ICalendarDate } from '../types/calendarDate';
import { getPartsFromYmd } from '../utils/helpers';
import { makeYm, makeYmd } from '../utils/helpers';
import { getCalendarDatesInDateRange } from './calendarDate';

export const getYearMonthForDate = (date: Date): IYearMonth => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1 as TMonthNumber;

  return { year, month };
};

export const getMonthsForRequest = (yearMonth: IYearMonth, numberAhead = 0): IYearMonth[] => {
  const { year, month } = yearMonth;
  const months = [ yearMonth ];

  for (let i = 1; i <= numberAhead; i++) {
    months.push(getYearMonthForDate(new Date(year, (month - 1 + i))));
  }
  return months;
};

export const fetchCalendarMonths = async (months: IYearMonth[]): Promise<TCalendarsData> => {
  const sortedMonths = (
    [ ...months ].sort((a, b) => makeYm(a.year, a.month) > makeYm(b.year, b.month) ? 1 : -1)
  );

  const firstMonth = sortedMonths[0];
  const firstDate = `${makeYm(firstMonth.year, firstMonth.month)}-01`;

  const lastMonth = sortedMonths[sortedMonths.length - 1];
  const firstDayOfLastMonth = new Date(lastMonth.year, lastMonth.month - 1, 1);
  const lastDayOfLastMonth = (
    new Date(firstDayOfLastMonth.getFullYear(), firstDayOfLastMonth.getMonth() + 1, 0)
  );
  const lastDate = (
    makeYmd(
      lastDayOfLastMonth.getFullYear(),
      lastDayOfLastMonth.getMonth() + 1 as TMonthNumber,
      lastDayOfLastMonth.getDate() as TDateNumber,
    )
  );

  const calendarDates = (
    await getCalendarDatesInDateRange(getPartsFromYmd(firstDate), getPartsFromYmd(lastDate))
  );

  return (
    calendarDates.reduce<Record<string, ICalendarDate[]>>((acc, calendarDate) => {
      const { year, month } = calendarDate;
      const ym = makeYm(year, month as TMonthNumber);

      return {
        ...acc,
        [ym]: [ ...(acc[ym] ? acc[ym] : []), calendarDate ],
      };
    }, {})
  );
};

export const sortCalendarDates = (a: ICalendarDate, b: ICalendarDate) => (
  (new Date(a.year, a.month - 1, a.date)) > (new Date(b.year, b.month - 1, b.date)) ? 1 : -1
);

export const mapCalendarDateToDate = ({ year, month, date }: ICalendarDate): Date => (
  new Date(year, month - 1, date)
);

export const mapCalendarDateToYmd = ({ year, month, date }: ICalendarDate): string => (
  makeYmd(year, month as TMonthNumber, date as TDateNumber)
);

/**
 * Returns an array of YYYY-MM-DD strings, one for each date (inclusive) between
 * the Date object arguments, regardless of order.
 * @param firstDate
 * @param secondDate
 */
export const getDatesInRange = (firstDate: Date, secondDate: Date): string[] => {
  const [ start, end ] = [ firstDate, secondDate ].sort((a, b) => a.getTime() < b.getTime() ? -1 : 1);

  const dates = [];
  while (start.toISOString() <= end.toISOString()) {
    dates.push(
      `${
        start.getFullYear()
      }-${
        `${start.getMonth() + 1}`.padStart(2, '0')
      }-${
        `${start.getDate()}`.padStart(2, '0')
      }`
    );

    start.setDate(start.getDate() + 1);
  }

  return dates;
};
