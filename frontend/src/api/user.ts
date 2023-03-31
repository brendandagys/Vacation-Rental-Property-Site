import { api } from '.';
import { IUser, IUserPutRequest } from '../types/user';

export const getAllUsers = async (): Promise<IUser[]> => {
  const { body: { data: allUsers } } = (
    await api<IUser[]>('fetch?Entity=User', 'GET')
  );

  console.info('All users:', { allUsers });

  return allUsers;
};

export const getUserByUsername = async (username: string): Promise<IUser> => {
  const { body: { data: user } } = (
    await api<IUser>(`fetch?Entity=User?username=${username}`, 'GET')
  );

  console.info('user:', { user });

  return user;
};

export const getUserByEmail = async (email: string): Promise<IUser> => {
  const { body: { data: user } } = (
    await api<IUser>(`fetch?Entity=User?email=${email}`, 'GET')
  );

  console.info('user:', { user });

  return user;
};

export const putUser = async (user: IUserPutRequest): Promise<string> => {
  const { body: { data: putItemOutput } } = (
    await api<string>('put', 'PUT', user)
  );

  console.info('PUT user output:', putItemOutput);

  return putItemOutput;
};
