import { Nullable } from '.';

export type THttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE';

export interface IApiResponse<T> {
  data: T;
  meta: {
    count: number;
    limit: Nullable<number>;
    custom: Nullable<Record<string, unknown>>;
  };
}

export interface IApiErrorResponse {
  message: string;
}

export interface IApiParsedResponse<T> {
  status: number;
  errorMessage: Nullable<string>;
  body: Nullable<IApiResponse<T>>;
}
