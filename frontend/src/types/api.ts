import { Nullable } from '.';

export type THttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE';

export interface IApiResponse<T = unknown> {
  data: T;
  meta: {
    records: number;
    limit: Nullable<number>;
  };
}
