import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

interface IInformationCardProps {
  backgroundColor?: string;
  color?: string;
  lines: string[];
  subtitle?: string;
  title?: string;
}

export const InformationCard = ({
  backgroundColor,
  color = 'black',
  lines,
  subtitle,
  title,
}: IInformationCardProps): JSX.Element => (
  <Card className='information-card__container'>
    <Card.Body>
      { title && <Card.Title className='mb-4'>{title}</Card.Title> }
      {
        subtitle
        && (
          <Card.Subtitle className='mt-2 mb-4'>
            {subtitle}
          </Card.Subtitle>
        )
      }
      <ListGroup>
        {
          lines.map((line, i) => (
            <ListGroup.Item
              key={line}
              className='my-list-group-item'
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
