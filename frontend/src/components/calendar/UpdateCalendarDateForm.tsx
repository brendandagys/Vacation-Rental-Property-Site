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
  const [ state, setState ] = useState(calendarDate.state);
  const [ price, setPrice ] = useState(`${calendarDate.price}`);
  const [ cellColor, setCellColor ] = useState(calendarDate.cellColor);

  useEffect(() => {
    setDatesToUpdate((old) => [
      ...old.filter(({ ymd }) => ymd !== calendarDate.ymd),
      {
        ...calendarDate,
        cellColor: cellColor || undefined,
        price: parseInt(price),
        state,
      },
    ].sort((a, b) => a.ymd < b.ymd ? -1 : 1));

  }, [ cellColor, price, setDatesToUpdate, state ]); // eslint-disable-line react-hooks/exhaustive-deps

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
              type="text"
              placeholder="Price"
              value={price}
              onChange={({ target: { value } }) => {
                value.match(/^\d*\.?\d*$/) && setPrice(value);
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Cell Color</Form.Label>
            <Form.Control
              type="color"
              value={cellColor ?? ''}
              onChange={(e) => setCellColor(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Card>
    </Col>
  );
};
