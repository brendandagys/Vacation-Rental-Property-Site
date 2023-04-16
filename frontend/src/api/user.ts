import { api, isApiResponse } from '.';
import { Nullable } from '../types';
import { IUser, IUserPutRequest } from '../types/user';

export const getAllUsers = async (): Promise<IUser[]> => {
  const { body, errorMessage } = (
    await api<IUser[]>('fetch?entity=User', 'GET')
  );

  if (body && isApiResponse(body)) {
    const { data: allUsers } = body;
    console.info('All users:', { allUsers });
    return allUsers;
  }

  return [];
};

export const getUserByUsername = async (username: string): Promise<Nullable<IUser>> => {
  const { body, errorMessage } = (
    await api<IUser>(`fetch?entity=User&username=${username}`, 'GET')
  );

  if (body && isApiResponse(body)) {
    const { data: user } = body;
    console.info('User:', { user });
    return user;
  }

  return null;
};

export const getUserByEmail = async (email: string): Promise<Nullable<IUser>> => {
  const { body, errorMessage } = (
    await api<IUser>(`fetch?entity=User&email=${email}`, 'GET')
  );

  if (body && isApiResponse(body)) {
    const { data: user } = body;
    console.info('User:', { user });
    return user;
  }

  return null;
};

export const putUser = async (user: IUserPutRequest): Promise<Nullable<string>> => {
  const { body, errorMessage } = (
    await api<string>('put', 'PUT', user)
  );

  if (body && isApiResponse(body)) {
    const { data: putItemOutput } = body;
    console.info('PUT user output:', putItemOutput);
    return putItemOutput;
  }

  return null;
};
