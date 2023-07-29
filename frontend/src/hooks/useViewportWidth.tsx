import { useState, useEffect } from 'react';

interface ViewportInformation {
  mobile: boolean;
  width: number;
}

export const useViewportWidth = (): ViewportInformation => {
  const [width, setWidth] = useState(window.innerWidth);

  const mobile = width < 579;

  useEffect(() => {
    const handleResize = () => { setWidth(window.innerWidth); };
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { mobile, width };
};
