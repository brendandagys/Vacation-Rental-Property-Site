import React, { useMemo } from "react";
import { Accordion, Col, Row, Spinner } from "react-bootstrap";
import { ITestimonial } from "../types/testimonial";
import { Testimonial } from "./Testimonial";
import { useLanguage } from "../context/languageContext";

interface TestimonialsListProps {
  testimonials: ITestimonial[];
  loading: boolean;
}

const starBuckets = [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5, 0];

export const TestimonialsList: React.FC<TestimonialsListProps> = ({
  testimonials,
  loading,
}) => {
  const { getText } = useLanguage();

  const grouped = useMemo(() => {
    const map: Record<number, ITestimonial[]> = {};

    starBuckets.forEach((s) => {
      map[s] = [];
    });

    testimonials.forEach((t) => {
      const starsVal =
        typeof (t as unknown as { stars?: number }).stars === "number"
          ? (t as unknown as { stars: number }).stars
          : 0;

      const starsExact = starsVal;

      if (!map[starsExact]) {
        map[starsExact] = [];
      }

      map[starsExact].push(t);
    });

    return map;
  }, [testimonials]);

  if (loading) {
    return (
      <div className="text-center w-100 py-4">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Accordion
      alwaysOpen
      defaultActiveKey={["5"]}
      className="testimonials-accordion w-100 mt-5"
    >
      {starBuckets.map((bucket) => {
        const items = grouped[bucket] || [];

        if (!items.length) {
          return null;
        }

        return (
          <Accordion.Item eventKey={bucket.toString()} key={bucket}>
            <Accordion.Header>
              {bucket}{" "}
              {bucket !== 1
                ? getText("testimonials-stars")
                : getText("testimonials-star")}{" "}
              ({items.length})
            </Accordion.Header>
            <Accordion.Body>
              <Row>
                {items.map((t, i) => (
                  <Col key={i} xs={12} md={6} xl={4} className="mb-4">
                    <Testimonial
                      content={t.comment || t.title}
                      name={
                        (t as unknown as { name?: string }).name ||
                        (getText("testimonials-guest") as string)
                      }
                      stars={(t as unknown as { stars?: number }).stars || 0}
                    />
                  </Col>
                ))}
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};
