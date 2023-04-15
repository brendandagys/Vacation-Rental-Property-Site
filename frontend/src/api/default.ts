import { api, isApiResponse } from './index';
import { IDefault, IDefaultPutRequest } from '../types/default';
import { Nullable } from '../types';

export const getAllDefaults = async (): Promise<IDefault[]> => {
  const { body, errorMessage } = await api<IDefault[]>('fetch?Entity=Default', 'GET');

  if (body && isApiResponse(body)) {
    const { data: allDefaults } = body;
    console.info('Defaults:', { allDefaults });
    return allDefaults;
  }

  return [];
};

export const getDefaultByName = async (name: string): Promise<Nullable<IDefault>> => {
  const { body, errorMessage } = (
    await api<IDefault>(`fetch?Entity=Default?name=${name}`, 'GET')
  );

  if (body && isApiResponse(body)) {
    const { data: defaultFor } = body;
    console.info('Default:', { defaultFor });
    return defaultFor;
  }

  return null;
};

export const putDefault = async (defaultObject: IDefaultPutRequest): Promise<Nullable<string>> => {
  const { body, errorMessage } = (
    await api<string>('put', 'PUT', defaultObject)
  );

  if (body && isApiResponse(body)) {
    const { data: putItemOutput } = body;
    console.info('PUT default output:', putItemOutput);
    return putItemOutput;
  }

  return null;
};

export const putDefaults = async (defaults: IDefaultPutRequest[]): Promise<Nullable<string>> => {
  const { body, errorMessage } = (
    await api<string>('put', 'PUT', defaults)
  );

  if (body && isApiResponse(body)) {
    const { data: putItemsOutput } = body;
    console.info('PUT defaults output:', putItemsOutput);
    return putItemsOutput;
  }

  return null;
};
