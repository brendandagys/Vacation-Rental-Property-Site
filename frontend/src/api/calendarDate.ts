import { ECalendarDateState, ICalendarDate, IYearMonthDate } from '../types';
import { ICalendarDatePutRequest } from '../types/calendarDate';
import { getYmdFromParts } from '../utils/helpers';
import { api } from './index';

export const getSpecificCalendarDates = async (ymdList: string[]): Promise<ICalendarDate[]> => {
  const query = new URLSearchParams({ dates: JSON.stringify(ymdList) });
  const { body: { data: calendarDates } } = (
    await api<ICalendarDate[]>(`fetch?Entity=CalendarDate&${query.toString()}`, 'GET')
  );

  console.info('Calendar dates: ', calendarDates);

  return calendarDates;
};

export const getCalendarDatesByState = async (state: ECalendarDateState): Promise<ICalendarDate[]> => {
  const { body: { data: calendarDates } } = (
    await api<ICalendarDate[]>(`fetch?Entity=CalendarDate?state=${state}`, 'GET')
  );

  console.info('Calendar dates:', calendarDates);

  return calendarDates;
};

export const getCalendarDatesInDateRange = async (
  startDate: IYearMonthDate,
  endDate: IYearMonthDate
): Promise<ICalendarDate[]> => {
  const { body: { data: calendarDates } } = (
    await api<ICalendarDate[]>(
      `fetch?Entity=CalendarDate?start_date=${
        getYmdFromParts(startDate)}&end_date=${getYmdFromParts(endDate)}`,
      'GET'
    )
  );

  console.info('Calendar dates:', calendarDates);

  return calendarDates;
};

export const putCalendarDate = async (calendarDate: ICalendarDatePutRequest): Promise<string> => {
  const { body: { data: putItemOutput } } = (
    await api<string>('put', 'PUT', calendarDate)
  );

  console.info('PUT calendar date output:', putItemOutput);

  return putItemOutput;
};

export const putCalendarDates = async (calendarDates: ICalendarDatePutRequest[]): Promise<string> => {
  const { body: { data: putItemOutput } } = (
    await api<string>('put', 'PUT', calendarDates)
  );

  console.info('PUT calendar dates output:', putItemOutput);

  return putItemOutput;
};
