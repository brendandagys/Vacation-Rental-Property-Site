import { IMandatoryDynamodbFields } from '.';

export enum EDateState {
  Available = 'Available',
  Booked = 'Booked',
  Unavailable = 'Unavailable',
}

export interface ICalendarDatePutRequest {
  ymd: string;
  state?: EDateState;
  price: number;
  year: number;
  month: number;
  date: number;
  cellColor?: string;
}

export interface ICalendarDate extends Omit<ICalendarDatePutRequest, 'state'>, IMandatoryDynamodbFields {
  state: EDateState;
}
