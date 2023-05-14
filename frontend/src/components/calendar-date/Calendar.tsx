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
  onDateClick: (calendarDate: ICalendarDate, isEdgeOfRange: boolean) => void;
  selected: ICalendarDate[];
  setHoveredDate: Dispatch<SetStateAction<ICalendarDate | null>>;
  stateOfLastMonthLastDate: EDateState;
  stateOfNextMonthFirstDate: EDateState;
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
  stateOfLastMonthLastDate,
  stateOfNextMonthFirstDate,
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
    dateData.map((calendarDate, i) => {
      const { date, price, state, cellColor } = calendarDate;

      const isSelected = selected.includes(calendarDate);
      const isHovered = ymdsInHoverRange.includes(calendarDate);

      const isPast = mapCalendarDateToDate(calendarDate) < new Date();

      const isStartOfUnavailableRange = (
        state !== EDateState.Available
        && (
          (
            i > 0
            && dateData[i - 1].state === EDateState.Available
          )
          || (
            i === 0
            && stateOfLastMonthLastDate === EDateState.Available
          )
        )
      );
      const isEndOfUnavailableRange = (
        state !== EDateState.Available
        && (
          (
            i < dateData.length - 1
            && dateData[i + 1].state === EDateState.Available
          )
          || (
            i === dateData.length - 1
            && stateOfNextMonthFirstDate === EDateState.Available
          )
        )
      );

      return (
        <td
          key={`D${date}`}
          onClick={() => onDateClick(calendarDate, isStartOfUnavailableRange || isEndOfUnavailableRange)}
          onMouseEnter={() => setHoveredDate(calendarDate)}
          onMouseLeave={() => setHoveredDate(null)}
          style={{ ...(cellColor ? { background: cellColor } : {}) }}
        >
          <div className={
            `calendar__date-cell
            calendar__date-cell${isAdmin ? '--admin' : ''}
            calendar__date-cell${state ? `--${state.toLowerCase()}` : ''}
            calendar__date-cell${isPast ? '--is-past' : ''}
            calendar__date-cell${
        isStartOfUnavailableRange
          ? '--is-start-of-unavailable-range'
          : isEndOfUnavailableRange ? '--is-end-of-unavailable-range' : ''
        }
            calendar__date-cell${
        isSelected
          ? '--selected'
          : (
            (
              isAdmin
              && (
                isHovered
                || hoveredDate === calendarDate
              )
            )
            || (
              !isPast
              && isValidHover
              && (
                (isHovered && state === EDateState.Available) // In range of dates hovered, after 1 click
                || (
                  hoveredDate === calendarDate
                  && (
                    state === EDateState.Available
                    || isStartOfUnavailableRange
                    || isEndOfUnavailableRange
                  )
                )
              )
            )
          )
            ? '--hovered'
            : ''}
          calendar__date-cell${(hoveredDate === calendarDate && !isValidHover) ? '--invalid-hover' : ''}`
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
