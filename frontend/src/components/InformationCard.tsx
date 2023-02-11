import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

interface IInformationCardProps {
  lines: string[];
  title?: string;
  subtitle?: string;
  variant?: string;
}

export const InformationCard = ({
  lines,
  title,
  subtitle,
  variant,
}: IInformationCardProps) => (
  <Card>
    <Card.Body>
      { title && <Card.Title className="mb-4">{title}</Card.Title> }
      {
        subtitle
        && (
          <Card.Subtitle className="mt-2 mb-4 text-muted">
            {subtitle}
          </Card.Subtitle>
        )
      }
      <ListGroup>
        {
          lines.map((line, i) => (
            <ListGroup.Item
              { ... (variant && i % 2 === 0) ? { variant } : {}} key={i}
            >
              {line}
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </Card.Body>
  </Card>
);
