import { KeyboardEventHandler, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { logIn } from '../api/authentication';
import { Nullable } from '../types';
import { useAuth } from '../context/authContext';

export const LogInForm = () => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const { validateTokenAndSetDecodedToken } = useAuth();

  const [ errorMessage, setErrorMessage ] = useState<Nullable<string>>(null);

  const submitForm = async () => {
    const { token, errorMessage } = await logIn({ username, password });

    token && void validateTokenAndSetDecodedToken(token);
    errorMessage && setErrorMessage(errorMessage);
  };

  const submitFormOnEnter: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') {
      void submitForm();
    }
  };

  return (
    <Container className="p-4 mt-3">
      <Row className="justify-content-center">
        <Col xs={10} sm={6} md={5} lg={4} xl={3}>
          <div className="bg-white rounded p-4 mt-5">
            <Form>
              <Form.Group className="mb-4" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setErrorMessage(null);
                  }}
                  onKeyDown={submitFormOnEnter}
                />
                {
                  errorMessage &&
                  <Form.Text className="login-form__error-message">
                    {errorMessage}
                  </Form.Text>
                }
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage(null);
                  }}
                  onKeyDown={submitFormOnEnter}
                />
              </Form.Group>
              <Button variant="primary" onClick={() => void submitForm()}>
                Submit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
