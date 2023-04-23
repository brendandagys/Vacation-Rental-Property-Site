import { EDefaultFor } from '../types/default';

export const DEFAULT_PRICE = 85;

export const DEFAULT_JANUARY = 85;
export const DEFAULT_FEBRUARY = 85;
export const DEFAULT_MARCH = 85;
export const DEFAULT_APRIL = 85;
export const DEFAULT_MAY = 100;
export const DEFAULT_JUNE = 130;
export const DEFAULT_JULY = 180;
export const DEFAULT_AUGUST = 240;
export const DEFAULT_SEPTEMBER = 150;
export const DEFAULT_OCTOBER = 85;
export const DEFAULT_NOVEMBER = 85;
export const DEFAULT_DECEMBER = 85;

const defaultValueMap = {
  [EDefaultFor.PriceJanuary]: DEFAULT_JANUARY,
  [EDefaultFor.PriceFebruary]: DEFAULT_FEBRUARY,
  [EDefaultFor.PriceMarch]: DEFAULT_MARCH,
  [EDefaultFor.PriceApril]: DEFAULT_APRIL,
  [EDefaultFor.PriceMay]: DEFAULT_MAY,
  [EDefaultFor.PriceJune]: DEFAULT_JUNE,
  [EDefaultFor.PriceJuly]: DEFAULT_JULY,
  [EDefaultFor.PriceAugust]: DEFAULT_AUGUST,
  [EDefaultFor.PriceSeptember]: DEFAULT_SEPTEMBER,
  [EDefaultFor.PriceOctober]: DEFAULT_OCTOBER,
  [EDefaultFor.PriceNovember]: DEFAULT_NOVEMBER,
  [EDefaultFor.PriceDecember]: DEFAULT_DECEMBER,
};

export const getDefaultValueForDefault = (defaultFor: EDefaultFor): string | number => (
  defaultValueMap[defaultFor]
);
