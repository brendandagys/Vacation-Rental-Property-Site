import { IYearMonthDate, TDateNumber, TMonthNumber } from '../types';

export const makeYmd = (year: string | number, month: TMonthNumber, date: TDateNumber): string => (
  `${year}-${`${month}`.padStart(2, '0')}-${`${date}`.padStart(2, '0')}`
);

export const makeYm = (year: string | number, month: TMonthNumber): string => (
  `${year}-${`${month}`.padStart(2, '0')}`
);

/**
 * Returns an object representation of a YYYY-MM-DD date, with `year`, `month`, and `date`.
 * @param ymd YYYY-MM-DD string
 * @returns e.g. { year: 2020, month: 3, date: 17 }
 */
export const getPartsFromYmd = (ymd: string): IYearMonthDate => {
  const year = parseInt(ymd.slice(0, 4));
  const month = parseInt(ymd.slice(5, 7)) as TMonthNumber;
  const date = parseInt(ymd.slice(8, 10)) as TDateNumber;

  return { year, month, date };
};

/**
 * Forms a YYYY-MM-DD string from an object with `year`, `month`, `date` numbers.
 * @param yearMonthDate e.g. { year: 2020, month: 3, date: 17 }
 * @returns YYYY-MM-DD string
 */
export const getYmdFromParts = (yearMonthDate: IYearMonthDate): string => {
  const { year, month, date } = yearMonthDate;
  const padded = (num: number) => num.toString().padStart(2, '0');
  return `${year}-${padded(month)}-${padded(date)}`;
};

/**
 * Turns an array into an array of arrays, each containing the specified number of items.
 * @param array
 * @param elementsPerArray Size of each child array
 * @returns An array of arrays
 */
export const chunkArray = <T>(array: T[], elementsPerArray: number): T[][] => [
  array.slice(0, elementsPerArray),
  ...(array.length <= elementsPerArray ? [] : chunkArray(array.slice(elementsPerArray), elementsPerArray)),
];
