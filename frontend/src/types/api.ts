import { Nullable } from '.';

export type THttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE';

export interface IApiResponse<T> {
  data: Nullable<T>;
  meta: {
    count: number;
    limit: Nullable<number>;
  };
}
