import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Container, Col, Form, Row, Table } from 'react-bootstrap';
import { Nullable } from '../../types';
import { IBookingInquiryPutRequest } from '../../types/bookingInquiry';
import { getText } from '../../static/text';

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
  const [email, setEmail] = useState('');
  const [fromTo] = useState<Nullable<string>>(_fromTo ?? null);
  const [last, setLast] = useState('');
  const [first, setFirst] = useState('');
  const [phone, setPhone] = useState('');
  const [adultCount, setAdultCount] = useState<Nullable<number>>(null);
  const [childCount, setChildCount] = useState<Nullable<number>>(null);
  const [message, setMessage] = (
    useState(
      `${(getText('inquiry-modal-message-placeholder-1') || '').toString()}${fromTo
        ? (
          ` ${(getText('inquiry-modal-message-placeholder-from') || '').toString()
          } ${fromTo.split(' - ')[0]} ${(getText('inquiry-modal-message-placeholder-to') || '').toString()
          } ${fromTo.split(' - ')[1]}`
        )
        : ''
      }. ${(getText('inquiry-modal-message-placeholder-2') || '').toString()}`
    )
  );

  const adultAndChildrenTotal = useMemo(() => (
    (adultCount ?? 0) + (childCount ?? 0)
  ), [adultCount, childCount]);

  const extraLinensCount = useMemo(() => (
    adultAndChildrenTotal > 2 ? adultAndChildrenTotal - 2 : 0
  ), [adultAndChildrenTotal]);

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
                <h5 className='text-center mb-2'><b>{getText('inquiry-modal-booking-fees')}</b></h5>
                <Table striped bordered hover className='inquiry-fee-table mb-5 w-75 mx-auto'>
                  <thead>
                    <tr>
                      <th>{getText('inquiry-modal-item')}</th>
                      <th className="text-center">{getText('inquiry-modal-fee')}</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>{numDatesSelected} {
                        numDatesSelected === 1
                          ? getText('inquiry-modal-day')
                          : getText('inquiry-modal-days')
                      }</td>
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
                          {extraLinensCount} {
                            extraLinensCount === 1
                              ? getText('inquiry-modal-additional-linen-package')
                              : getText('inquiry-modal-additional-linen-package')
                          }
                        </td>
                        <td className="text-center">€{(-2 + adultAndChildrenTotal) * 16}</td>
                      </tr>
                    }
                  </tbody>
                  {
                    adultAndChildrenTotal > 2 &&
                    <caption className='text-muted font-2xs'>
                      {getText('inquiry-modal-linens-disclaimer')}
                    </caption>
                  }
                </Table>
              </>
            )
            : null
        }
      </Container>

      <Form.Group className="mb-4 pt-3">
        <Form.Label style={{ fontSize: 18 }}>*{getText('inquiry-modal-email-label')}</Form.Label>
        <Form.Control
          required
          value={email}
          onChange={({ target: { value } }) => { setEmail(value); }}
          style={{ fontSize: '18px', height: 40 }}
        />
        <Form.Text className="font-xs text-muted">
          {getText('inquiry-modal-email-helper-text')}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-4">
        <Row>
          <Col xs={6}>
            <Form.Label style={{ fontSize: 18 }}>*{getText('inquiry-modal-last-label')}</Form.Label>
            <Form.Control
              required
              value={last}
              onChange={({ target: { value } }) => {
                setLast(value);
              }}
              style={{ fontSize: '18px', height: 40 }}
            />
          </Col>

          <Col xs={6}>
            <Form.Label style={{ fontSize: 18 }}>*{getText('inquiry-modal-first-label')}</Form.Label>
            <Form.Control
              required
              value={first}
              onChange={({ target: { value } }) => {
                setFirst(value);
              }}
              style={{ fontSize: '18px', height: 40 }}
            />
          </Col>
        </Row>

      </Form.Group>

      <Form.Group className="mb-4">
        <Row>
          <Col xs={6}>
            <Form.Label style={{ fontSize: 18 }}>{getText('inquiry-modal-phone-label')}</Form.Label>
            <Form.Control
              value={phone}
              onChange={({ target: { value } }) => {
                setPhone(value);
              }}
              style={{ fontSize: '18px', height: 40 }}
            />
          </Col>

          <Col xs={3}>
            <Form.Label style={{ fontSize: 18 }}>{getText('inquiry-modal-adults-label')}</Form.Label>
            <Form.Control
              type="number"
              value={adultCount ?? ''}
              onChange={({ target: { value } }) => {
                if (value[0] === '-') {
                  return;
                }

                setAdultCount(parseInt(value) || null);
              }}
              style={{ fontSize: '18px', height: 40 }}
            />
          </Col>

          <Col xs={3}>
            <Form.Label style={{ fontSize: 18 }}>{getText('inquiry-modal-children-label')}</Form.Label>
            <Form.Control
              type="number"
              value={childCount ?? ''}
              onChange={({ target: { value } }) => {
                if (value[0] === '-') {
                  return;
                }

                setChildCount(parseInt(value) || null);
              }}
              style={{ fontSize: '18px', height: 40 }}
            />
          </Col>
        </Row>

      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label style={{ fontSize: 18 }}>*{getText('inquiry-modal-message-label')}</Form.Label>
        <Form.Control
          required
          as="textarea"
          onChange={({ target: { value } }) => {
            setMessage(value);
          }}
          rows={5}
          value={message}
          style={{ fontSize: '18px' }}
        />
      </Form.Group>
    </Form>
  );
};
