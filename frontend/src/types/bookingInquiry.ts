import { IMandatoryDynamodbFields } from '.';

export enum EBookingInquiryState {
  New = 'New',
  InProgress = 'InProgress',
  Rejected = 'Rejected',
  Accepted = 'Accepted',
}

export interface IBookingInquiryPutRequest {
  state?: EBookingInquiryState;
  email: string;
  fromTo?: string;
  last?: string;
  first?: string;
  phone?: string;
  subtotal?: string;
  adultCount?: number;
  childCount?: number;
  message: string;
}
export interface IBookingInquiry extends Omit<IBookingInquiryPutRequest, 'state'>, IMandatoryDynamodbFields {
  state: EBookingInquiryState;
}
