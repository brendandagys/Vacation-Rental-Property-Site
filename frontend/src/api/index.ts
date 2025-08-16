import { IApiErrorResponse, IApiParsedResponse, IApiResponse, THttpMethod } from "../types/api";

const API = (
  process.env.NODE_ENV === "production" ? "https://api.calaceite.holiday" : "http://localhost:3000"
);

export const isApiResponse = <T>(
  responseBody: IApiResponse<T> | IApiErrorResponse
): responseBody is IApiResponse<T> => {
  return Object.hasOwn(responseBody, "data") && Object.hasOwn(responseBody, "meta");
};

const isApiErrorResponse = <T>(
  responseBody: IApiResponse<T> | IApiErrorResponse
): responseBody is IApiErrorResponse => {
  return Object.hasOwn(responseBody, "message");
};

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
  requestBody?: object,
  ...args: unknown[]
): Promise<IApiParsedResponse<T>> => {
  const token = localStorage.getItem("token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    // Accept: 'application/json',
  };

  if (token) {
    headers["Authorization"] = token;
  }

  const finalRequestBody = (
    Array.isArray(requestBody) ? requestBody : { ...requestBody, ...args }
  );

  const response = (
    await fetch(`${API}/${path}`, {
      method,
      headers,
      body: (requestBody ?? null) && JSON.stringify(finalRequestBody),
    })
  );

  const responseBody = await response.json() as IApiResponse<T> | IApiErrorResponse;

  const isError = response.status >= 400 && response.status !== 404 && isApiErrorResponse(responseBody);
  const errorMessage = isError ? responseBody.message : null;

  const body = isApiResponse(responseBody) ? responseBody : null;

  return {
    status: response.status,
    errorMessage,
    body,
  };
};
