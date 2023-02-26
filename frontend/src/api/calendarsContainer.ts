// import { api } from '.';
import { dateData } from '../static/data/date-data';
import {
  TCalendarMonthsRequest,
  TCalendarsData,
  TMonthNumber,
  IYearMonth,
  ICalendarDate,
} from '../types';
import { makeYmd } from '../utils/helpers';

export const getYearMonthForDate = (date: Date): IYearMonth => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1 as TMonthNumber;

  return { year, month };
};

export const getMonthsForRequest = (yearMonth: IYearMonth, numberAhead = 0): TCalendarMonthsRequest => {
  const { year, month } = yearMonth;
  const months = [ yearMonth ];

  for (let i = 1; i <= numberAhead; i++) {
    months.push(getYearMonthForDate(new Date(year, (month + i))));
  }

  return months;
};

export const fetchCalendarMonths = async (
  months: TCalendarMonthsRequest
): Promise<TCalendarsData> => (
  // api(months);
  Promise.resolve(dateData)
);

export const sortCalendarDates = (a: ICalendarDate, b: ICalendarDate) => (
  (new Date(a.year, a.month - 1, a.date)) > (new Date(b.year, b.month - 1, b.date)) ? 1 : -1
);

export const mapCalendarDateToDate = ({ year, month, date }: ICalendarDate): Date => (
  new Date(year, month - 1, date)
);

export const mapCalendarDateToString = ({ year, month, date }: ICalendarDate): string => (
  makeYmd(year, month, date)
);

export const getDatesInRange = (startDate: Date, endDate: Date): string[] => {
  const [ start, end ] = [ startDate, endDate ].sort((a, b) => a.getTime() < b.getTime() ? -1 : 1);
  // console.log({ start, end });
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

  console.log({ dates });

  return dates;
};
