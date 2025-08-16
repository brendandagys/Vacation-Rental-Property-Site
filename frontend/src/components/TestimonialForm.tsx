import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { EStars, ITestimonialPutRequest } from "../types/testimonial";
import { StarRating } from "./StarRating";

export interface TestimonialFormProps {
  visible: boolean;
  onSubmit: (
    payload: ITestimonialPutRequest
  ) => Promise<{ ok: boolean; error?: string }>;
}

const defaultStars = EStars.Five;

export const TestimonialForm = forwardRef<HTMLDivElement, TestimonialFormProps>(
  ({ visible, onSubmit }, ref) => {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const [stars, setStars] = useState<EStars>(defaultStars);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const [honeypot, setHoneypot] = useState("");
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => wrapperRef.current as HTMLDivElement, []);

    const remaining = 1500 - comment.length;
    const canSubmit = name && title && comment && remaining >= 0 && !submitting;
    const active = false;

    const handleSubmit = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();

        if (!canSubmit || honeypot) {
          return;
        }

        setSubmitting(true);
        setError(null);
        setSuccess(false);

        const payload: ITestimonialPutRequest = {
          name,
          title,
          comment,
          stars,
          active,
        };

        const res = await onSubmit(payload);

        setSubmitting(false);

        if (!res.ok) {
          setError(res.error || "Failed to submit");
        } else {
          setSuccess(true);
          setComment("");
          setTitle("");
        }
      },
      [canSubmit, honeypot, name, title, comment, stars, onSubmit, active]
    );

    // After success, hide form with delay
    useEffect(() => {
      if (success) {
        const t = setTimeout(() => setDismissed(true), 2000);
        return () => clearTimeout(t);
      }
    }, [success]);

    if (!visible || dismissed) {
      return null;
    }

    return (
      <Row
        ref={wrapperRef}
        className="testimonial-form-wrapper text-white mb-5"
      >
        <Col xs={12} md={10} lg={8} className="mx-auto">
          <Form
            onSubmit={(e) => {
              void handleSubmit(e);
            }}
            className="testimonial-form p-4 border rounded-4 shadow-lg"
          >
            {error && (
              <Alert variant="danger" className="py-2 my-2">
                {error}
              </Alert>
            )}
            {success && (
              <Alert variant="success" className="py-2 my-2">
                Thank you! Your review was submitted.
              </Alert>
            )}
            <Form.Group controlId="testimonialName" className="mb-5">
              <Form.Label>Name or initials</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                disabled={submitting}
                onChange={(e) => setName(e.target.value)}
                className="form-control-lg"
                placeholder="e.g. Jane D. or JD"
              />
            </Form.Group>
            <Form.Group controlId="testimonialTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                maxLength={120}
                required
                value={title}
                disabled={submitting}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control-lg"
              />
              <div className="form-hint small text-end">{title.length}/120</div>
            </Form.Group>
            <Form.Group controlId="testimonialComment" className="mb-3">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                maxLength={1500}
                required
                value={comment}
                disabled={submitting}
                onChange={(e) => setComment(e.target.value)}
                className="form-control-lg"
              />
              <div className="form-hint small text-end">
                {remaining} characters left
              </div>
            </Form.Group>
            <Form.Group controlId="testimonialStars" className="mb-4">
              <Form.Label>Rating</Form.Label>
              <div>
                <StarRating
                  value={stars}
                  onChange={setStars}
                  disabled={submitting}
                />
              </div>
            </Form.Group>
            {/* honeypot */}
            <div
              style={{
                position: "absolute",
                left: "-10000px",
                top: "auto",
                width: 1,
                height: 1,
                overflow: "hidden",
              }}
            >
              <label>
                Website
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </label>
            </div>
            <div className="text-end mt-2">
              <Button
                type="submit"
                size="lg"
                variant="primary"
                disabled={!canSubmit}
                className="px-4 py-2 fw-semibold"
              >
                {submitting ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    );
  }
);
