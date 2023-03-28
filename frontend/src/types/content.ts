import { IMandatoryDynamodbFields } from '.';

export enum EContentId {
  Header = 'Header',
  HeroImage = 'HeroImage',
  Subheader = 'Subheader',
  Description = 'Description',
  Footer = 'Footer',
}

export enum ELanguage {
  Danish = 'Danish',
  Dutch = 'Dutch',
  English = 'English',
  French = 'French',
  German = 'German',
  Spanish = 'Spanish',
  Swedish = 'Swedish',
}

export interface IContentPutRequest {
  contentId: EContentId;
  version: number;
}

export interface ITextContentPutRequest extends IContentPutRequest {
  language: ELanguage;
  value: string;
}

export interface IImageContentPutRequest extends IContentPutRequest {
  url: string;
}

export interface ITextContent extends ITextContentPutRequest, IMandatoryDynamodbFields {}

export interface IImageContent extends IImageContentPutRequest, IMandatoryDynamodbFields {}

export type IContent = ITextContent | IImageContent;
