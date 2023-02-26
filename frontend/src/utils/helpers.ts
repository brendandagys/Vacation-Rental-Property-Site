import { IYearMonthDate, TDateNumber, TMonthNumber } from '../types';

export const makeYmd = (year: string | number, month: TMonthNumber, date: TDateNumber): string => (
  `${year}-${`${month}`.padStart(2, '0')}-${`${date}`.padStart(2, '0')}`
);

export const makeYm = (year: string | number, month: TMonthNumber): string => (
  `${year}-${`${month}`.padStart(2, '0')}`
);

export const getPartsFromYmd = (ymd: string): IYearMonthDate => {
  const year = parseInt(ymd.slice(0, 4));
  const month = parseInt(ymd.slice(5, 7)) as TMonthNumber;
  const date = parseInt(ymd.slice(8, 10)) as TDateNumber;

  return { year, month, date };
};
