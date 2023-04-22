import { api } from '.';
import { Nullable } from '../types';
import { IJwtToken, ILogInRequest, ILogInResponse } from '../types/authentication';

export const validateToken = async (token: string): Promise<Nullable<IJwtToken>> => {
  const { status, body } = await api<IJwtToken>('auth', 'POST', { token });

  if (status === 200 && body?.data) {
    return body.data;
  }

  return null;
};

export const logIn = async (
  logInRequest: ILogInRequest
): Promise<{ token: Nullable<string>; errorMessage: Nullable<string> }> => {
  const { body, errorMessage } = (
    await api<ILogInResponse>('auth', 'POST', logInRequest)
  );

  if (body?.data) {
    console.info('Token:', body.data.token);
    localStorage.setItem('token', body.data.token);
    window.history.pushState(null, '', '/admin');
  }

  return {
    token: body?.data.token ?? null,
    errorMessage,
  };

};

export const logOut = (): void => {
  localStorage.removeItem('token');
};
