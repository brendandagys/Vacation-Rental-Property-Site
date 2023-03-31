import { api } from './index';
import { IDefault, IDefaultPutRequest } from '../types/default';

export const getAllDefaults = async (): Promise<IDefault[]> => {
  const { body: { data: allDefaults } } = await api<IDefault[]>('fetch?Entity=Default', 'GET');
  console.info('Defaults:', { allDefaults });
  return allDefaults;
};

export const putDefault = async (defaultObject: IDefaultPutRequest) => {
  const { body: { data: putItemOutput } } = (
    await api<string>('put', 'PUT', defaultObject)
  );

  console.info('PUT default output:', putItemOutput);

  return putItemOutput;
};

export const putDefaults = async (defaults: IDefaultPutRequest[]): Promise<string> => {
  const { body: { data: putItemOutput } } = (
    await api<string>('put', 'PUT', defaults)
  );

  console.info('PUT defaults output:', putItemOutput);

  return putItemOutput;
};
