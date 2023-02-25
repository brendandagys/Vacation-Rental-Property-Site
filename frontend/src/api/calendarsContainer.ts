// import { api } from '.';
import { dateData } from '../static/data/dateData';
import { TCalendarMonthsRequest, TCalendarsData } from '../types';

export const fetchCalendarMonths = async (
  months: TCalendarMonthsRequest
): Promise<TCalendarsData> => (
  // api(months);
  Promise.resolve(dateData)
);
