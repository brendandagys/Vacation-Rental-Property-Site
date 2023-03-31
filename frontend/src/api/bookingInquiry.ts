import { api } from './index';
import { EBookingInquiryState, IBookingInquiry, IBookingInquiryPutRequest } from '../types/bookingInquiry';
import { IYearMonthDate } from '../types';
import { getYmdFromParts } from '../utils/helpers';

export const getAllBookingInquiries = async (): Promise<IBookingInquiry[]> => {
  const { body: { data: allBookingInquiries } } = (
    await api<IBookingInquiry[]>('fetch?Entity=BookingInquiry', 'GET')
  );

  console.info('Booking inquiries:', { allBookingInquiries });

  return allBookingInquiries;
};

export const getBookingInquiriesByState = async (state: EBookingInquiryState): Promise<IBookingInquiry[]> => {
  const { body: { data: bookingInquiries } } = (
    await api<IBookingInquiry[]>(`fetch?Entity=BookingInquiry?state=${state}`, 'GET')
  );

  console.info('Booking inquiries:', { bookingInquiries });

  return bookingInquiries;
};

export const getBookingInquiriesInDateRange = async (
  startDate: IYearMonthDate,
  endDate: IYearMonthDate
): Promise<IBookingInquiry[]> => {
  const { body: { data: bookingInquiries } } = (
    await api<IBookingInquiry[]>(
      `fetch?Entity=BookingInquiry?start_date=${
        getYmdFromParts(startDate)}&end_date=${getYmdFromParts(endDate)}`,
      'GET'
    )
  );

  console.info('Booking inquiries:', { bookingInquiries });

  return bookingInquiries;
};

export const putBookingInquiry = async (bookingInquiry: IBookingInquiryPutRequest): Promise<string> => {
  const { body: { data: putItemOutput } } = (
    await api<string>('put', 'PUT', bookingInquiry)
  );

  console.info('PUT booking inquiry output:', putItemOutput);

  return putItemOutput;
};
