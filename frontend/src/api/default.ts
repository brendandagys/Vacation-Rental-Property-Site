import { api, isApiResponse } from './index';
import { EDefaultFor, IDefault, IDefaultPutRequest } from '../types/default';
import { Nullable } from '../types';
import { getDefaultValueForDefault } from '../utils/constants';

const createIfNotExistsAllMonthDefaults = async (fetchedDefaults: IDefault[]): Promise<IDefault[]> => {
  const mustExist = Object.values(EDefaultFor);

  const fetchedDefaultFors = fetchedDefaults.map((d) => d.defaultFor);
  const missingDefaultFors = mustExist.filter((defaultFor) => !fetchedDefaultFors.includes(defaultFor));

  if (!missingDefaultFors.length) {
    return fetchedDefaults;
  }

  await putDefaults(missingDefaultFors.map((defaultFor) => ({
    defaultFor,
    value: `${getDefaultValueForDefault(defaultFor)}`,
  })));

  return getAllDefaults();
};

export const getAllDefaults = async (): Promise<IDefault[]> => {
  const { body, errorMessage } = await api<IDefault[]>('fetch?entity=Default', 'GET');

  if (body && isApiResponse(body)) {
    const { data: allDefaults } = body;

    const allDefaultsEnsured = await createIfNotExistsAllMonthDefaults(allDefaults);

    // console.info('Defaults:', { allDefaultsEnsured });
    return allDefaultsEnsured;
  }

  return [];
};

export const getDefaultByName = async (name: string): Promise<Nullable<IDefault>> => {
  const { body, errorMessage } = (
    await api<IDefault>(`fetch?entity=Default&name=${name}`, 'GET')
  );

  if (body && isApiResponse(body)) {
    const { data: defaultFor } = body;
    // console.info('Default:', { defaultFor });
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
    // console.info('PUT default output:', putItemOutput);
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
    // console.info('PUT defaults output:', putItemsOutput);
    return putItemsOutput;
  }

  return null;
};
