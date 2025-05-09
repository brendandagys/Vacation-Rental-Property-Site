import { useInView } from 'react-intersection-observer';

interface FadeInImageProps {
  src: string;
  alt?: string;
}

export const FadeInImage = ({ src, alt }: FadeInImageProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={`fade-in-image ${inView ? 'visible' : ''}`}
    />
  );
};
