import { PropsWithChildren } from "react";
import { useInView } from "react-intersection-observer";

type FadeInSectionProps = PropsWithChildren<{ threshold?: number }>;

export const FadeInSection = ({
  children,
  threshold = 0.45,
}: FadeInSectionProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold });

  return (
    <div ref={ref} className={`fade-in-section ${inView ? "visible" : ""}`}>
      {children}
    </div>
  );
};
