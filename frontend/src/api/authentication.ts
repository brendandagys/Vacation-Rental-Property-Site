import { api } from '.';
import { ILogInRequest, ILogInResponse } from '../types/authentication';

export const logIn = async (logInRequest: ILogInRequest): Promise<string | void> => {
  const { body, errorMessage } = (
    await api<ILogInResponse>('log-in', 'POST', logInRequest)
  );

  if (errorMessage) {
    return errorMessage;
  }

  if (body?.data) {
    console.info('Token:', body.data.token);
    localStorage.setItem('token', body.data.token);
  }

};

export const logOut = (): void => {
  localStorage.removeItem('token');
};
