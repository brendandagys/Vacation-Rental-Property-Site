import { useEffect, useMemo } from "react";
import useTestimonials from "../hooks/useTestimonials";
import { TestimonialsGallery } from "./TestimonialsGallery";
import { TestimonialForm } from "./TestimonialForm";
import { TestimonialsList } from "./TestimonialsList";
import { scrollTo } from "../utils/scroll";

const TOKEN_VALUE = "guest-review";

export const TestimonialsContainer = () => {
  const { data, loading, error, submit } = useTestimonials({
    activeOnly: true,
  });

  const formVisible = useMemo(() => {
    return new URL(window.location.href).pathname.endsWith(`${TOKEN_VALUE}`);
  }, []);

  // Auto scroll to the form when it becomes visible
  useEffect(() => {
    if (formVisible) {
      const t = setTimeout(() => {
        scrollTo("testimonials", -60, true);
      }, 500);

      return () => clearTimeout(t);
    }
  }, [formVisible]);

  return (
    <>
      <TestimonialForm visible={formVisible} onSubmit={submit} />

      {error && <div className="text-danger mb-3">{error}</div>}

      <div className="mb-5 w-100">
        <TestimonialsList testimonials={data} loading={loading} />
      </div>

      <div className="mb-5 mt-3 pb-3 w-100">
        <TestimonialsGallery />
      </div>
    </>
  );
};
