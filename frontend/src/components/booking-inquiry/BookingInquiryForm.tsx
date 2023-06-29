import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Container, Col, Form, Row, Table } from 'react-bootstrap';
import { Nullable } from '../../types';
import { IBookingInquiryPutRequest } from '../../types/bookingInquiry';

interface IBookingInquiryFormProps {
  fromTo: Nullable<string>;
  numDatesSelected: number;
  setPutRequest: Dispatch<SetStateAction<Nullable<IBookingInquiryPutRequest>>>;
  subtotal: Nullable<number>;
}

export const BookingInquiryForm = ({
  fromTo: _fromTo,
  numDatesSelected,
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
  const [ message, setMessage ] = (
    useState(
      `I am interested in booking this property${
        fromTo ? ` from ${fromTo.split(' - ')[0]} to ${fromTo.split(' - ')[1]}` : ''
      }. Please contact me with some additional information.`
    )
  );

  const adultAndChildrenTotal = useMemo(() => (
    (adultCount ?? 0) + (childCount ?? 0)
  ), [ adultCount, childCount ]);

  const extraLinensCount = useMemo(() => (
    adultAndChildrenTotal > 2 ? adultAndChildrenTotal - 2 : 0
  ), [ adultAndChildrenTotal ]);

  useEffect(() => {
    const hasMandatoryFields = email && last && first && message && adultCount && adultCount > 0;

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
          message: message + (
            (numDatesSelected)
              ? ` | EXTRA LINENS CHARGE: €${extraLinensCount * 16} | NUMBER OF DAYS: ${numDatesSelected}`
              : ''
          ),
        }
        : null
    );
  }, [
    adultCount,
    childCount,
    email,
    extraLinensCount,
    first,
    fromTo,
    last,
    message,
    numDatesSelected,
    phone,
    setPutRequest,
    subtotal,
  ]);

  return (
    <Form className='inquiry-form'>
      <Container>
        {
          (fromTo && numDatesSelected && subtotal)
            ? (
              <>
                <h5 className='text-center mb-2'><b>Booking Fees</b></h5>
                <Table striped bordered hover className='inquiry-fee-table mb-5 w-75 mx-auto'>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th className="text-center">Fee</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>{numDatesSelected} day{numDatesSelected === 1 ? '' : 's'}</td>
                      <td className="text-center">€{subtotal}</td>
                    </tr>
                    {/* <tr>
                      <td>Cleaning fee</td>
                      <td className="text-center">€100</td>
                    </tr> */}
                    {
                      extraLinensCount > 0 &&
                      <tr>
                        <td>
                          {extraLinensCount} additional linen package{extraLinensCount === 1 ? '' : 's'}
                        </td>
                        <td className="text-center">€{(-2 + adultAndChildrenTotal) * 16}</td>
                      </tr>
                    }
                  </tbody>
                  {
                    adultAndChildrenTotal > 2 &&
                    <caption className='text-muted font-2xs'>
                      Two linen packages are included free with every stay.
                    </caption>
                  }
                </Table>
              </>
            )
            : null
        }
      </Container>

      <Form.Group className="mb-4 pt-3">
        <Form.Label>*Email</Form.Label>
        <Form.Control
          required
          value={email}
          onChange={({ target: { value } }) => { setEmail(value); }}
          style={{ fontSize: '16px' }}
        />
        <Form.Text className="font-xs text-muted">
          We'll never share your information with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-4">
        <Row>
          <Col xs={6}>
            <Form.Label>*Last</Form.Label>
            <Form.Control
              required
              value={last}
              onChange={({ target: { value } }) => {
                setLast(value);
              }}
              style={{ fontSize: '16px' }}
            />
          </Col>

          <Col xs={6}>
            <Form.Label>*First</Form.Label>
            <Form.Control
              required
              value={first}
              onChange={({ target: { value } }) => {
                setFirst(value);
              }}
              style={{ fontSize: '16px' }}
            />
          </Col>
        </Row>

      </Form.Group>

      <Form.Group className="mb-4">
        <Row>
          <Col xs={6}>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              value={phone}
              onChange={({ target: { value } }) => {
                setPhone(value);
              }}
              style={{ fontSize: '16px' }}
            />
          </Col>

          <Col xs={3}>
            <Form.Label>Adults</Form.Label>
            <Form.Control
              type="number"
              value={adultCount ?? ''}
              onChange={({ target: { value } }) => {
                if (value[0] === '-') {
                  return;
                }

                setAdultCount(parseInt(value) || null);
              }}
              style={{ fontSize: '16px' }}
            />
          </Col>

          <Col xs={3}>
            <Form.Label>Children</Form.Label>
            <Form.Control
              type="number"
              value={childCount ?? ''}
              onChange={({ target: { value } }) => {
                if (value[0] === '-') {
                  return;
                }

                setChildCount(parseInt(value) || null);
              }}
              style={{ fontSize: '16px' }}
            />
          </Col>
        </Row>

      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>*Message</Form.Label>
        <Form.Control
          required
          as="textarea"
          onChange={({ target: { value } }) => {
            setMessage(value);
          }}
          rows={5}
          value={message}
          style={{ fontSize: '16px' }}
        />
      </Form.Group>
    </Form>
  );
};
