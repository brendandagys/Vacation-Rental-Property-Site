import { KeyboardEventHandler, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { logIn } from '../api/authentication';
import { Nullable } from '../types';

export const LogInForm = () => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ errorMessage, setErrorMessage ] = useState<Nullable<string>>(null);

  const submitForm = async () => {
    const errorMessage = await logIn({ username, password });
    errorMessage && setErrorMessage(errorMessage);
  };

  const submitFormOnEnter: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') {
      void submitForm();
    }
  };

  return (
    <Container className="w-25 bg-white rounded p-4 mt-5">
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
    </Container>
  );
};
