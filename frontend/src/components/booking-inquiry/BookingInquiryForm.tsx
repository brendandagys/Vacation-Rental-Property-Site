import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Nullable } from '../../types';
import { IBookingInquiryPutRequest } from '../../types/bookingInquiry';

interface IBookingInquiryFormProps {
  fromTo: Nullable<string>;
  setPutRequest: Dispatch<SetStateAction<Nullable<IBookingInquiryPutRequest>>>;
  subtotal: Nullable<number>;
}

export const BookingInquiryForm = ({
  fromTo: _fromTo,
  setPutRequest,
  subtotal,
}: IBookingInquiryFormProps) => {
  const [ email, setEmail ] = useState('');
  const [ fromTo ] = useState<Nullable<string>>(_fromTo ?? null);
  const [ last, setLast ] = useState('');
  const [ first, setFirst ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ adultCount, setAdultCount ] = useState<Nullable<number>>(null);
  const [ childCount, setChildCount ] = useState<Nullable<number>>(null);
  const [ message, setMessage ] = useState('');

  useEffect(() => {
    const hasMandatoryFields = email && last && first && message;

    setPutRequest(
      hasMandatoryFields
        ? {
          email,
          fromTo: fromTo ?? undefined,
          last,
          first,
          phone,
          subtotal: subtotal ? `${subtotal}` : undefined,
          adultCount: adultCount ?? undefined,
          childCount: childCount ?? undefined,
          message,
        }
        : null
    );
  }, [ adultCount, childCount, email, first, fromTo, last, message, phone, setPutRequest, subtotal ]);

  return (
    <Form>
      <Form.Group className="mb-4">
        <Form.Label>*Email</Form.Label>
        <Form.Control
          required
          value={email}
          onChange={({ target: { value } }) => { setEmail(value); }}
        />
        <Form.Text className="font-xs text-muted">
          We'll never share your information with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>*Last</Form.Label>
        <Form.Control
          required
          value={last}
          onChange={({ target: { value } }) => {
            setLast(value);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>*First</Form.Label>
        <Form.Control
          required
          value={first}
          onChange={({ target: { value } }) => {
            setFirst(value);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          value={phone}
          onChange={({ target: { value } }) => {
            setPhone(value);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Row>
          <Col xs={6}>
            <Form.Label>Adults</Form.Label>
            <Form.Control
              type="number"
              value={adultCount ?? ''}
              onChange={({ target: { value } }) => { setAdultCount(parseInt(value) || null); }}
            />
          </Col>

          <Col xs={6}>
            <Form.Label>Children</Form.Label>
            <Form.Control
              type="number"
              value={childCount ?? ''}
              onChange={({ target: { value } }) => { setChildCount(parseInt(value) || null); }}
            />
          </Col>
        </Row>

      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>*Message</Form.Label>
        <Form.Control
          required
          as="textarea"
          value={message}
          onChange={({ target: { value } }) => {
            setMessage(value);
          }}
        />
      </Form.Group>
    </Form>
  );
};
