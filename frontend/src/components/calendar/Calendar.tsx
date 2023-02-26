import { Dispatch, SetStateAction, useState } from 'react';
import { mapCalendarDateToDate } from '../../api/calendarsContainer';
import { monthsEnglish, weekdayHeadersEnglish } from '../../static/data/date-data';
import { ECalendarDateState, ICalendarDate } from '../../types';

interface ICalendarProps {
  dateData: ICalendarDate[];
  inHoverRange: ICalendarDate[];
  onDateClick: (calendarDate: ICalendarDate) => void;
  selected: ICalendarDate[];
  setHoveredDate: Dispatch<SetStateAction<ICalendarDate | null>>;
}

enum EPriceColor {
  green = 'green',
  yellow = 'yellow',
  orange = 'orange',
  red = 'red',
}

const weekdayHeaders = (
  weekdayHeadersEnglish
    .map((day) => <th key={day} className='calendar__weekday-header'>{day}</th>)
);

export const Calendar = ({
  dateData,
  inHoverRange,
  onDateClick,
  selected,
  setHoveredDate,
}: ICalendarProps): JSX.Element => {
  const firstDayOfMonth = dateData[0];
  const { year, month } = firstDayOfMonth;
  const firstWeekdayOfMonth = (new Date(year, month - 1, 1)).getDay(); // 0: Sunday

  const [ currencySymbol ] = useState('€');

  const getBlankCalendarCell = (
    (key: number | string) => <td key={`B${key}`} className='empty' />
  );

  const getPriceColor = (price: number): EPriceColor => {
    const color = (
      price >= 200 ? 'red' : price >= 170 ? 'orange' : price >= 150 ? 'yellow' : 'green'
    );

    return EPriceColor[color];
  };

  const blankCells = Array.from(Array(firstWeekdayOfMonth)).map((_, i) => getBlankCalendarCell(i));
  const dateCells = (
    dateData.map((calendarDate) => {
      const { date, price, state: _state, priceColor: _priceColor } = calendarDate;

      const priceColor = _priceColor || getPriceColor(price);

      const state = (
        (mapCalendarDateToDate(calendarDate) < (new Date()))
          ? ECalendarDateState.unavailable
          : _state
      );

      return (
        <td
          key={`D${date}`}
          onClick={() => onDateClick(calendarDate)}
          onMouseEnter={() => setHoveredDate(calendarDate)}
          onMouseLeave={() => setHoveredDate(null)}
        >
          <div className={
            `calendar__date-cell
            calendar__date-cell${state ? `--${state}` : ''}
            calendar__date-cell${
        selected.includes(calendarDate)
          ? '--selected'
          : inHoverRange.includes(calendarDate)
            ? '--hovered'
            : ''}`
          }>
            <p>{date}</p>
            <p className={`calendar__date-cell__price calendar__date-cell__price${
              priceColor ? `--${priceColor}` : ''}`}>{currencySymbol}{price}</p>
          </div>
        </td>
      );
    })
  );

  const rows = (
    [ ...blankCells, ...dateCells ]
      .reduce<JSX.Element[][]>(
      (acc, slot, i) => {
        acc[Math.floor(i / 7)].push(slot);
        return acc;
      },
      [ [], [], [], [], [], [] ]
    )
      .filter((row) => row.length) // Remove last row when unused
  );

  const lastRow = rows[rows.length - 1];

  while (lastRow.length < 7) {
    lastRow.push(getBlankCalendarCell(7 + lastRow.length));
  }

  const calendarRows = rows.map((row, i) => <tr key={i}>{row}</tr>);

  return (
    <div className='calendar'>
      <div className='p-2 calendar__month-indicator'>
        <h2>{monthsEnglish[month - 1]} {year}</h2>
      </div>
      <table className='calendar__table'>
        <thead><tr>{weekdayHeaders}</tr></thead>
        <tbody>{calendarRows}</tbody>
      </table>
    </div>
  );
};
