import { api, isApiResponse } from './index';
import { IContent, IContentPutRequest } from '../types/content';
import { Nullable } from '../types';

export const getAllContent = async (): Promise<IContent[]> => {
  const { body, errorMessage } = await api<IContent[]>('fetch?Entity=Content', 'GET');

  if (body && isApiResponse(body)) {
    const { data: allContent } = body;
    console.info('Content:', { allContent });
    return allContent;
  }

  return [];
};

export const getContentByContentId = async (content_id: string): Promise<Nullable<IContent>> => {
  const { body, errorMessage } = (
    await api<IContent>(`fetch?Entity=Content?content_id=${content_id}`, 'GET')
  );

  if (body && isApiResponse(body)) {
    const { data: content } = body;
    console.info('Content:', { content });
    return content;
  }

  return null;
};

export const putContent = async (content: IContentPutRequest): Promise<Nullable<string>> => {
  const { body, errorMessage } = (
    await api<string>('put', 'PUT', content)
  );

  if (body && isApiResponse(body)) {
    const { data: putItemOutput } = body;
    console.info('PUT content output:', putItemOutput);
    return putItemOutput;
  }

  return null;
};

export const putContents = async (contents: IContentPutRequest[]): Promise<Nullable<string>> => {
  const { body, errorMessage } = (
    await api<string>('put', 'PUT', contents)
  );

  if (body && isApiResponse(body)) {
    const { data: putItemsOutput } = body;
    console.info('PUT contents output:', putItemsOutput);
    return putItemsOutput;
  }

  return null;
};
