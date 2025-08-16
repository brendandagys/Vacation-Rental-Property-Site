import { useCallback, useEffect, useRef, useState } from "react";
import { getAllTestimonials, getTestimonialsByActive, putTestimonial } from "../api/testimonial";
import { EStars, ITestimonial, ITestimonialPutRequest } from "../types/testimonial";

interface UseTestimonialsOptions {
  activeOnly?: boolean;
}

interface UseTestimonialsResult {
  data: ITestimonial[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  submit: (payload: ITestimonialPutRequest) => Promise<{ ok: boolean; error?: string; }>;
}

// Map enum to numeric for convenience (backend already stores numeric)
export const starsEnumToNumeric = (stars: EStars): number => {
  const order: EStars[] = [
    EStars.Zero,
    EStars.Half,
    EStars.One,
    EStars.OneAndAHalf,
    EStars.Two,
    EStars.TwoAndAHalf,
    EStars.Three,
    EStars.ThreeAndAHalf,
    EStars.Four,
    EStars.FourAndAHalf,
    EStars.Five,
  ];

  const idx = order.indexOf(stars);
  if (idx === -1) { return 0; }
  return idx * 0.5;
};

export const useTestimonials = (opts: UseTestimonialsOptions = {}): UseTestimonialsResult => {
  const { activeOnly = true } = opts;
  const [data, setData] = useState<ITestimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fetchedOnce = useRef(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let testimonials: ITestimonial[] = [];

      if (activeOnly) {
        testimonials = await getTestimonialsByActive(true);

        if (!testimonials.length) {
          testimonials = await getAllTestimonials();
        }
      } else {
        testimonials = await getAllTestimonials();
      }

      setData(testimonials.sort((a, b) => (a.created && b.created ? (a.created > b.created ? -1 : 1) : 0)));
    } catch (e: unknown) {
      const message = (e as { message?: string; })?.message || "Failed to load testimonials";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [activeOnly]);

  useEffect(() => {
    if (!fetchedOnce.current) {
      fetchedOnce.current = true;
      void fetchData();
    }
  }, [fetchData]);

  const refresh = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  const submit = useCallback(async (payload: ITestimonialPutRequest) => {
    try {
      const output = await putTestimonial(payload);

      if (output === null) {
        return { ok: false, error: "Submission failed" };
      }

      // Optimistic append
      setData(prev => [
        {
          ...payload,
          PK: "PENDING",
          "GSI-PK": "TESTIMONIAL",
          SK: new Date().toISOString(),
          stars: starsEnumToNumeric(payload.stars),
          created: new Date().toISOString(),
          modified: null,
        } as unknown as ITestimonial,
        ...prev,
      ]);

      // void fetchData();
      return { ok: true };
    } catch (e: unknown) {
      const message = (e as { message?: string; })?.message || "Failed to submit testimonial";
      return { ok: false, error: message };
    }
  }, []);
  // }, [fetchData]);

  return { data, loading, error, refresh, submit };
};

export default useTestimonials;
