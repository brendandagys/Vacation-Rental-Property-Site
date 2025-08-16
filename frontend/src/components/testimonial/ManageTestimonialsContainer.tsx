import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import {
  getTestimonialsByActive,
  toggleTestimonialActive,
} from "../../api/testimonial";
import { ITestimonial } from "../../types/testimonial";

export const ManageTestimonialsContainer = () => {
  const [inactive, setInactive] = useState<ITestimonial[]>([]);
  const [active, setActive] = useState<ITestimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [inactiveList, activeList] = await Promise.all([
        getTestimonialsByActive(false),
        getTestimonialsByActive(true),
      ]);

      const sortByDateDesc = (a: ITestimonial, b: ITestimonial) =>
        a.created > b.created ? -1 : 1;

      setInactive([...inactiveList].sort(sortByDateDesc));
      setActive([...activeList].sort(sortByDateDesc));
    } catch (e: unknown) {
      setError((e as { message?: string }).message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const onToggle = useCallback(
    async (item: ITestimonial, makeActive: boolean) => {
      setToggling(`${item.PK}#${item.SK}`);

      try {
        await toggleTestimonialActive({
          PK: item.PK,
          SK: item.SK,
          active: makeActive,
        });

        await refresh();
      } finally {
        setToggling(null);
      }
    },
    [refresh]
  );

  const loadingView = useMemo(
    () => (
      <div className="text-center w-100 py-4">
        <Spinner animation="border" />
      </div>
    ),
    []
  );

  const List = ({
    items,
    emptyText,
    actionLabel,
    action,
    variant,
  }: {
    items: ITestimonial[];
    emptyText: string;
    actionLabel: string;
    action: (t: ITestimonial) => void;
    variant: "success" | "secondary";
  }) => (
    <>
      {items.length === 0 ? (
        <div className="text-muted">{emptyText}</div>
      ) : (
        <Row>
          {items.map((t) => (
            <Col key={`${t.PK}-${t.SK}`} xs={12} md={6} lg={4} className="mt-3">
              <Card className="p-3" style={{ background: "#f7f7f7" }}>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <div className="fw-semibold">{t.title}</div>
                    <div className="small text-muted">
                      {(t as unknown as { name?: string }).name || "Guest"} •{" "}
                      {new Date(t.created).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="small">
                    ⭐{" "}
                    {Math.round(
                      (t as unknown as { stars?: number }).stars || 0
                    )}
                  </div>
                </div>
                <div
                  className="mb-3"
                  style={{ maxHeight: 120, overflow: "auto" }}
                >
                  {t.comment}
                </div>
                <div className="text-end">
                  <Button
                    size="sm"
                    variant={variant}
                    disabled={toggling === `${t.PK}#${t.SK}`}
                    onClick={() => action(t)}
                  >
                    {toggling === `${t.PK}#${t.SK}`
                      ? "Updating..."
                      : actionLabel}
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );

  return (
    <Container fluid="md">
      {error && <div className="text-danger mb-3">{error}</div>}
      {loading ? (
        loadingView
      ) : (
        <Row>
          <Col xs={12} lg={6} className="mb-4">
            <h5>Pending Reviews (inactive)</h5>
            <List
              items={inactive}
              emptyText="No pending reviews."
              actionLabel="Enable"
              variant="success"
              action={(t) => void onToggle(t, true)}
            />
          </Col>
          <Col xs={12} lg={6} className="mb-4">
            <h5>Published Reviews (active)</h5>
            <List
              items={active}
              emptyText="No active reviews."
              actionLabel="Disable"
              variant="secondary"
              action={(t) => void onToggle(t, false)}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};
