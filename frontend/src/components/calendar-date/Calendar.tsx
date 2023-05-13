import { Dispatch, SetStateAction, useState } from 'react';
import { mapCalendarDateToDate } from '../../api/calendarsContainer';
import { monthsEnglish, weekdayHeadersEnglish } from '../../static/data/dates';
import { EDateState, ICalendarDate } from '../../types/calendarDate';

enum EPriceColor {
  green = 'green',
  yellow = 'yellow',
  orange = 'orange',
  red = 'red',
  black = 'black',
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

  const isPrimeMonth = [ 5, 6, 7, 8, 9 ].includes(month);

  const blankCells = Array.from(Array(firstWeekdayOfMonth)).map((_, i) => getBlankCalendarCell(i));
  const dateCells = (
    dateData.map((calendarDate) => {
      const { date, price, state, cellColor } = calendarDate;

      const isSelected = selected.includes(calendarDate);
      const isHovered = ymdsInHoverRange.includes(calendarDate);

      const isPast = mapCalendarDateToDate(calendarDate) < new Date();

      return (
        <td
          key={`D${date}`}
          onClick={() => onDateClick(calendarDate)}
          onMouseEnter={() => setHoveredDate(calendarDate)}
          onMouseLeave={() => setHoveredDate(null)}
          style={{ ...(cellColor ? { background: cellColor } : {}) }}
        >
          <div className={
            `calendar__date-cell
             calendar__date-cell${(hoveredDate === calendarDate && !isValidHover) ? '--invalid-hover' : ''}
             calendar__date-cell${isAdmin ? '--admin' : ''}
             calendar__date-cell${state ? `--${state.toLowerCase()}` : ''}
             calendar__date-cell${isPast ? '--is-past' : ''}
             calendar__date-cell${
        isSelected
          ? '--selected'
          : (
            (
              isValidHover && !isPast && (
                isHovered || (hoveredDate === calendarDate && state === EDateState.Available)
              )
            )
            || (isHovered && isAdmin)
          )
            ? '--hovered'
            : ''}`
          }>
            {date}

            <p
              className={`calendar__date-cell__price
              calendar__date-cell__price--${state !== EDateState.Available
          ? EPriceColor['black']
          : isPrimeMonth
            ? EPriceColor['orange']
            : EPriceColor['green']
        }`
              }>
              {
                isPast
                  ? <span style={{ opacity: 0 }}>_</span>
                  :
                  state === EDateState.Available
                    ? `${currencySymbol}${price}`
                    : <span className='font-6xs'>BOOKED</span>
              }
            </p>
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
