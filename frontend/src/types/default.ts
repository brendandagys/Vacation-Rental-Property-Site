import { IMandatoryDynamodbFields } from '.';

export enum EDefaultFor {
  PriceJanuary = 'PriceJanuary',
  PriceFebruary = 'PriceFebruary',
  PriceMarch = 'PriceMarch',
  PriceApril = 'PriceApril',
  PriceMay = 'PriceMay',
  PriceJune = 'PriceJune',
  PriceJuly = 'PriceJuly',
  PriceAugust = 'PriceAugust',
  PriceSeptember = 'PriceSeptember',
  PriceOctober = 'PriceOctober',
  PriceNovember = 'PriceNovember',
  PriceDecember = 'PriceDecember',
}

export interface IDefaultPutRequest {
  defaultFor: EDefaultFor;
  value: string;
}

export interface IDefault extends IDefaultPutRequest, IMandatoryDynamodbFields {}
