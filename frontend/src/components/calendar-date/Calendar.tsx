import { Dispatch, SetStateAction, useState } from 'react';
import { mapCalendarDateToDate } from '../../api/calendarsContainer';
import { monthsEnglish, weekdayHeadersEnglish } from '../../static/data/dates';
import { EDateState, ICalendarDate } from '../../types/calendarDate';

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

interface ICalendarProps {
  dateData: ICalendarDate[];
  hoveredDate: ICalendarDate | null;
  isAdmin?: boolean;
  isValidHover: boolean;
  onDateClick: (calendarDate: ICalendarDate) => void;
  selected: ICalendarDate[];
  setHoveredDate: Dispatch<SetStateAction<ICalendarDate | null>>;
  ymdsInHoverRange: ICalendarDate[];
}

export const Calendar = ({
  dateData,
  hoveredDate,
  isAdmin = false,
  isValidHover,
  onDateClick,
  selected,
  setHoveredDate,
  ymdsInHoverRange,
}: ICalendarProps) => {
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
      const { date, price, state: _state } = calendarDate;

      const priceColor = getPriceColor(price);

      const isSelected = selected.includes(calendarDate);
      const isHovered = ymdsInHoverRange.includes(calendarDate);

      const state = (
        (mapCalendarDateToDate(calendarDate) < new Date())
          ? EDateState.Unavailable
          : _state
      ).toLowerCase(); // Rust enum variants are capitalized

      return (
        <td
          key={`D${date}`}
          onClick={() => onDateClick(calendarDate)}
          onMouseEnter={() => setHoveredDate(calendarDate)}
          onMouseLeave={() => setHoveredDate(null)}
          style={{ ...(calendarDate.cellColor ? { background: calendarDate.cellColor } : {}) }}
        >
          <div className={
            `calendar__date-cell
             calendar__date-cell${(hoveredDate === calendarDate && !isValidHover) ? '--unavailable' : ''}
             calendar__date-cell${isAdmin ? '--admin' : ''}
             calendar__date-cell${state ? `--${state.toLowerCase()}` : ''}
             calendar__date-cell${
        isSelected
          ? '--selected'
          : ((isHovered && isValidHover) || hoveredDate === calendarDate)
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
    <div className='calendar mx-auto'>
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
