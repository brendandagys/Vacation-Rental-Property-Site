import { KeyboardEventHandler, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { logIn } from '../api/authentication';
import { Nullable } from '../types';
import { useAuth } from '../context/authContext';
import { useNav } from '../context/navContext';

export const LogInForm = () => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const { validateTokenAndSetDecodedToken } = useAuth();

  const [ errorMessage, setErrorMessage ] = useState<Nullable<string>>(null);

  const { setPath } = useNav();

  const submitForm = async () => {
    const { token, errorMessage } = await logIn({ username, password });

    if (token) {
      setPath('/admin');
      void validateTokenAndSetDecodedToken(token);
    }

    errorMessage && setErrorMessage(errorMessage);
  };

  const submitFormOnEnter: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') {
      void submitForm();
    }
  };

  return (
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
  );
};
