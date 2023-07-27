import { Button, Row } from 'react-bootstrap';
import { EDateState, ICalendarDate } from '../../types/calendarDate';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

interface IUpdateCalendarDateFormProps {
  calendarDate: ICalendarDate;
  setDatesToUpdate: Dispatch<SetStateAction<ICalendarDate[]>>;
}

export const UpdateCalendarDateForm = ({ calendarDate, setDatesToUpdate }: IUpdateCalendarDateFormProps) => {
  const [cellColor, setCellColor] = useState(calendarDate.cellColor);
  const [price, setPrice] = useState(`${calendarDate.price}`);
  const [state, setState] = useState(calendarDate.state);

  useEffect(() => {
    setCellColor(calendarDate.cellColor);
    setPrice(`${calendarDate.price}`);
    setState(calendarDate.state);
  }, [calendarDate]);

  useEffect(() => {
    setDatesToUpdate((old) => [
      ...old.filter(({ ymd }) => ymd !== calendarDate.ymd),
      {
        ...calendarDate,
        cellColor,
        price: parseInt(price || '0'),
        state,
      },
    ].sort((a, b) => a.ymd < b.ymd ? -1 : 1));

  }, [cellColor, price, setDatesToUpdate, state]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Col md={6} className="mt-5">
      <Card className="p-3 rounded">
        <Form>
          <h3 className="mb-3 text-primary">{calendarDate.SK}</h3>
          <Form.Group className="mb-4">
            <Form.Label>State</Form.Label>
            <Form.Select
              value={state}
              onChange={(e) => setState(e.target.value as EDateState)}
            >
              <option value={EDateState.Available}>Available</option>
              <option value={EDateState.Unavailable}>Unavailable</option>
              <option value={EDateState.Booked}>Booked</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              placeholder="Price"
              value={price === '0' ? '' : price}
              onChange={({ target: { value } }) => {
                value.match(/^\d*\.?\d*$/) && setPrice(value);
              }}
            />
          </Form.Group>

          <Row>
            <Col xs={6}>
              <Form.Group>
                <Form.Label>Cell Color</Form.Label>
                <Form.Control
                  type="color"
                  value={cellColor ?? ''}
                  onChange={(e) => setCellColor(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col xs={6}>
              <Button
                size='sm'
                onClick={() => {
                  setDatesToUpdate((old) => old.map((o) => ({ ...o, price: parseInt(price) })));
                }}
              >
                Apply price to all
              </Button>
              <Button
                size='sm'
                variant='secondary'
                className='mt-1'
                onClick={() => {
                  setDatesToUpdate((old) => old.map((o) => ({
                    ...o,
                    cellColor,
                    price: parseInt(price),
                    state,
                  })));
                }}
              >
                Apply to all
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Col>
  );
};
