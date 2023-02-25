export type TMonthNumber = 1|2|3|4|5|6|7|8|9|10|11|12;

export type TDateNumber = 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31;

export enum ECalendarDateState {
  available = 'available',
  booked = 'booked',
  unavailable = 'unavailable',
}

export interface ICalendarDate {
  year: number;
  month: TMonthNumber;
  date: TDateNumber;
  state: ECalendarDateState;
  priceColor?: string;
  price: number;
}

export type TYearMonth = { year: number, month: TMonthNumber };

export type TCalendarMonthsRequest = TYearMonth[];

export type TCalendarsData = Record<string, ICalendarDate[]>;
