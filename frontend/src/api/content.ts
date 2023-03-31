import { api } from './index';
import { IContent, IContentPutRequest } from '../types/content';

export const getAllContent = async (): Promise<IContent[]> => {
  const { body: { data: allContent } } = await api<IContent[]>('fetch?Entity=Content', 'GET');
  console.info('Content:', { allContent });
  return allContent;
};

export const putContent = async (content: IContentPutRequest): Promise<string> => {
  const { body: { data: putItemOutput } } = (
    await api<string>('put', 'PUT', content)
  );

  console.info('PUT content output:', putItemOutput);

  return putItemOutput;
};

export const putContents = async (contents: IContentPutRequest[]): Promise<string> => {
  const { body: { data: putItemOutput } } = (
    await api<string>('put', 'PUT', contents)
  );

  console.info('PUT contents output:', putItemOutput);

  return putItemOutput;
};
