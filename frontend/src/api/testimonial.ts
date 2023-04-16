import { api, isApiResponse } from '.';
import { IYearMonthDate, Nullable } from '../types';
import { EStars, ITestimonial, ITestimonialPutRequest } from '../types/testimonial';
import { getYmdFromParts } from '../utils/helpers';

export const getAllTestimonials = async (): Promise<ITestimonial[]> => {
  const { body, errorMessage } = (
    await api<ITestimonial[]>('fetch?entity=Testimonial', 'GET')
  );

  if (body && isApiResponse(body)) {
    const { data: allTestimonials } = body;
    console.info('Testimonials:', { allTestimonials });
    return allTestimonials;
  }

  return [];
};

export const getTestimonialsByStars = async (stars: EStars): Promise<ITestimonial[]> => {
  const { body, errorMessage } = (
    await api<ITestimonial[]>(`fetch?entity=Testimonial&stars=${stars}`, 'GET')
  );

  if (body && isApiResponse(body)) {
    const { data: testimonials } = body;
    console.info('Testimonials:', { testimonials });
    return testimonials;
  }

  return [];
};

export const getTestimonialsByActive = async (active: boolean): Promise<ITestimonial[]> => {
  const { body, errorMessage } = (
    await api<ITestimonial[]>(`fetch?entity=Testimonial&active=${active ? 'true' : 'false'}`, 'GET')
  );

  if (body && isApiResponse(body)) {
    const { data: testimonials } = body;
    console.info('Testimonials:', { testimonials });
    return testimonials;
  }

  return [];
};

export const getTestimonialsByActiveAndInDateRange = async (
  active: boolean,
  startDate: IYearMonthDate,
  endDate: IYearMonthDate
): Promise<ITestimonial[]> => {
  const { body, errorMessage } = (
    await api<ITestimonial[]>(
      `fetch?entity=Testimonial&active=${active ? 'true' : 'false'
      }&start_date=${getYmdFromParts(startDate)}&end_date=${getYmdFromParts(endDate)}`,
      'GET'
    )
  );

  if (body && isApiResponse(body)) {
    const { data: testimonials } = body;
    console.info('Testimonials:', { testimonials });
    return testimonials;
  }

  return [];
};

export const putTestimonial = async (testimonial: ITestimonialPutRequest): Promise<Nullable<string>> => {
  const { body, errorMessage } = (
    await api<string>('put', 'PUT', testimonial)
  );

  if (body && isApiResponse(body)) {
    const { data: putItemOutput } = body;
    console.info('PUT testimonial output:', putItemOutput);
    return putItemOutput;
  }

  return null;
};
