import { januaryData } from './1-january';
import { februaryData } from './2-february';
import { marchData } from './3-march';
import { aprilData } from './4-april';
import { mayData } from './5-may';
import { juneData } from './6-june';
import { julyData } from './7-july';
import { augustData } from './8-august';
import { septemberData } from './9-september';
import { octoberData } from './10-october';
import { novemberData } from './11-november';
import { decemberData } from './12-december';

import { TCalendarsData } from '../../../types';

export const weekdayHeadersEnglish = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];

export const monthsEnglish = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const dateData: TCalendarsData = {
  '2023-02': februaryData,
  '2023-03': marchData,
  '2023-04': aprilData,
  '2023-05': mayData,
  '2023-06': juneData,
  '2023-07': julyData,
  '2023-08': augustData,
  '2023-09': septemberData,
  '2023-10': octoberData,
  '2023-11': novemberData,
  '2023-12': decemberData,
  '2024-01': januaryData,
};
