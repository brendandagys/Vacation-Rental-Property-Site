import { IApiResponse, THttpMethod } from '../types/api';

const API = (
  process.env.NODE_ENV === 'production' ? 'https://api.spainluxury.holiday' : 'http://localhost:3000'
);

/**
 * Make an API request to the Lambda server.
 * @param path 
 * @param method 
 * @param body 
 * @param args 
 */
export const api = async <T = unknown>(
  path: string,
  method: THttpMethod,
  body?: object,
  ...args: unknown[]
): Promise<{ body: IApiResponse<T>; status: number }> => {
  const token =  localStorage.getItem('token');

  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = token;
  }

  const response = (
    await fetch(`${API}/${path}`, {
      method,
      headers,
      body: (body ?? null) && JSON.stringify({ ...body, ...args }),
    })
  );
  
  const status = response.status;
  const responseBody = await response.json() as IApiResponse<T>;

  return {
    body: responseBody,
    status,
  };
};
