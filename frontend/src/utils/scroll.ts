import { scroller } from 'react-scroll';

export const scrollTo = (to: string, offset = 0, smooth = true) => {
  scroller.scrollTo(to, { offset, smooth, spy: true });
};
