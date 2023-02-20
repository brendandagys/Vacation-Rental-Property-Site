import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

interface IInformationCardProps {
  lines: string[];
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
  color?: string;
}

export const InformationCard = ({
  lines,
  title,
  subtitle,
  backgroundColor,
  color = 'black',
}: IInformationCardProps) => (
  <Card style={{ border: '2px solid #d3d3d3' }}>
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
              className="my-list-group-item"
              style={ { ...i % 2 === 0 ? { backgroundColor, color } : {} } }
            >
              {line}
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </Card.Body>
  </Card>
);
