import { api } from '.';
import { ILogInRequest, ILogInResponse } from '../types/authentication';

export const logIn = async (logInRequest: ILogInRequest): Promise<string> => {
  const { body: { data: { token } } } = (
    await api<ILogInResponse>('log-in', 'PUT', logInRequest)
  );
  
  console.info('Token:', token);

  localStorage.setItem('token', token);

  return token;
};
