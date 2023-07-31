/* eslint-disable @typescript-eslint/no-unused-vars */
import { api, isApiResponse } from './index';
import { EBookingInquiryState, IBookingInquiry, IBookingInquiryPutRequest } from '../types/bookingInquiry';
import { IYearMonthDate, Nullable } from '../types';
import { getYmdFromParts } from '../utils/helpers';

export const getAllBookingInquiries = async (): Promise<IBookingInquiry[]> => {
  const { body, errorMessage } = (
    await api<IBookingInquiry[]>('fetch?entity=BookingInquiry', 'GET')
  );

  if (body && isApiResponse(body)) {
    const { data: allBookingInquiries } = body;
    // console.info('Booking inquiries:', { allBookingInquiries });

    return allBookingInquiries;
  }

  return [];
};

export const getBookingInquiriesByState = async (state: EBookingInquiryState): Promise<IBookingInquiry[]> => {
  const { body, errorMessage } = (
    await api<IBookingInquiry[]>(`fetch?entity=BookingInquiry&state=${state}`, 'GET')
  );

  if (body && isApiResponse(body)) {
    const { data: bookingInquiries } = body;
    // console.info('Booking inquiries:', { bookingInquiries });
    return bookingInquiries;
  }

  return [];
};

export const getBookingInquiriesInDateRange = async (
  startDate: IYearMonthDate,
  endDate: IYearMonthDate
): Promise<IBookingInquiry[]> => {
  const { body, errorMessage } = (
    await api<IBookingInquiry[]>(
      `fetch?entity=BookingInquiry&start_date=${getYmdFromParts(startDate)}&end_date=${getYmdFromParts(endDate)}`, // eslint-disable-line max-len
      'GET'
    )
  );

  if (body && isApiResponse(body)) {
    const { data: bookingInquiries } = body;
    // console.info('Booking inquiries:', { bookingInquiries });
    return bookingInquiries;
  }

  return [];
};

export const putBookingInquiry = async (
  bookingInquiry: IBookingInquiryPutRequest
): Promise<Nullable<string>> => {
  const { body, errorMessage } = (
    await api<string>('put', 'PUT', bookingInquiry)
  );

  if (body && isApiResponse(body)) {
    const { data: putItemOutput } = body;
    // console.info('PUT booking inquiry output:', putItemOutput);

    return putItemOutput;
  }

  return null;
};
