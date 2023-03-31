import { api } from '.';
import { IYearMonthDate } from '../types';
import { EStars, ITestimonial, ITestimonialPutRequest } from '../types/testimonial';
import { getYmdFromParts } from '../utils/helpers';

export const getAllTestimonials = async (): Promise<ITestimonial[]> => {
  const { body: { data: allTestimonials } } = (
    await api<ITestimonial[]>('fetch?Entity=Testimonial', 'GET')
  );

  console.info('Testimonials:', { allTestimonials });

  return allTestimonials;
};

export const getTestimonialsByStars = async (stars: EStars): Promise<ITestimonial[]> => {
  const { body: { data: testimonials } } = (
    await api<ITestimonial[]>(`fetch?Entity=Testimonial?stars=${stars}`, 'GET')
  );

  console.info('Testimonials:', { testimonials });

  return testimonials;
};

export const getTestimonialsByActive = async (active: boolean): Promise<ITestimonial[]> => {
  const { body: { data: testimonials } } = (
    await api<ITestimonial[]>(`fetch?Entity=Testimonial?active=${active ? 'true' : 'false'}`, 'GET')
  );

  console.info('Testimonials:', { testimonials });

  return testimonials;
};

export const getTestimonialsByActiveAndInDateRange = async (
  active: boolean,
  startDate: IYearMonthDate,
  endDate: IYearMonthDate
): Promise<ITestimonial[]> => {
  const { body: { data: testimonials } } = (
    await api<ITestimonial[]>(
      `fetch?Entity=Testimonial?active=${active ? 'true' : 'false'
      }&start_date=${getYmdFromParts(startDate)}&end_date=${getYmdFromParts(endDate)}`,
      'GET'
    )
  );

  console.info('Testimonials:', { testimonials });

  return testimonials;
};

export const putTestimonial = async (testimonial: ITestimonialPutRequest): Promise<string> => {
  const { body: { data: putItemOutput } } = (
    await api<string>('put', 'PUT', testimonial)
  );

  console.info('PUT testimonial output:', putItemOutput);

  return putItemOutput;
};
