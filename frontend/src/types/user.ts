import { IMandatoryDynamodbFields } from '.';

export interface IUserPutRequest {
  username: string;
  email: string;
  password: string;
  first: string;
  last: string;
  administrator: boolean;
  phone: string;
}

export interface IUser extends Omit<IUserPutRequest, 'password'>, IMandatoryDynamodbFields {
  hash: string;
  lastLogin?: string;
}
