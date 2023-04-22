import { IYearMonthDate, Nullable } from '../types';
import { EDateState, ICalendarDate, ICalendarDatePutRequest } from '../types/calendarDate';
import { getYmdFromParts } from '../utils/helpers';
import { api, isApiResponse } from './index';

export const getSpecificCalendarDates = async (ymdList: string[]): Promise<ICalendarDate[]> => {
  const params = new URLSearchParams();

  for (const ymd of ymdList) {
    params.append('dates', ymd);
  }

  const { body, errorMessage } = (
    await api<ICalendarDate[]>(`fetch?entity=CalendarDate&${params.toString()}`, 'GET')
  );

  if (body && isApiResponse(body)) {
    const { data: calendarDates } = body;
    console.info('Calendar dates: ', calendarDates);
    return calendarDates;
  }

  return [];
};

export const getCalendarDatesByState = async (state: EDateState): Promise<ICalendarDate[]> => {
  const { body, errorMessage } = (
    await api<ICalendarDate[]>(`fetch?entity=CalendarDate&state=${state}`, 'GET')
  );

  if (body && isApiResponse(body)) {
    const { data: calendarDates } = body;
    console.info('Calendar dates:', calendarDates);
    return calendarDates;
  }

  return [];
};

export const getCalendarDatesInDateRange = async (
  startDate: IYearMonthDate,
  endDate: IYearMonthDate
): Promise<ICalendarDate[]> => {
  const { body, errorMessage } = (
    await api<ICalendarDate[]>(
      `fetch?entity=CalendarDate&start_date=${
        getYmdFromParts(startDate)}&end_date=${getYmdFromParts(endDate)}`,
      'GET'
    )
  );

  if (body && isApiResponse(body)) {
    const { data: calendarDates } = body;
    console.info('Calendar dates:', calendarDates);
    return calendarDates;
  }

  return [];
};

export const putCalendarDate = async (calendarDate: ICalendarDatePutRequest): Promise<Nullable<string>> => {
  const { body, errorMessage } = (
    await api<string>('put', 'PUT', calendarDate)
  );

  if (body && isApiResponse(body)) {
    const { data: putItemOutput } = body;
    console.info('PUT calendar date output:', putItemOutput);
    return putItemOutput;
  }

  return null;
};

export const putCalendarDates = async (
  calendarDates: ICalendarDatePutRequest[]
): Promise<Nullable<string>> => {
  const { body, errorMessage } = (
    await api<string>('put', 'PUT', calendarDates)
  );

  if (body && isApiResponse(body)) {
    const { data: putItemOutput } = body;
    console.info('PUT calendar dates output:', putItemOutput);
    return putItemOutput;
  }

  return null;
};
