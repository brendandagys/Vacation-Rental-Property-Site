import { createContext, useContext, useEffect, useState } from 'react';
import { Nullable } from '../types';
import { validateToken } from '../api/authentication';
import { IJwtToken } from '../types/authentication';

interface IAuthContext {
  isLoggedIn: boolean;
  decodedToken: Nullable<IJwtToken>;
  setToken: (token: string) => void;
}

const getToken = (): Nullable<string> => localStorage.getItem('token');

export const AuthContext = createContext({} as IAuthContext);

let fetchedOnce = false;

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
  const [ decodedToken, setDecodedToken ] = useState<Nullable<IJwtToken>>(null);
  const [ token, setToken ] = useState<Nullable<string>>(getToken());

  const _validateToken = async (token: string): Promise<void> => {
    setDecodedToken(await validateToken(token));
  };

  useEffect(() => {
    if (!fetchedOnce) {
      fetchedOnce = true;
      token && void _validateToken(token);
    }
  }, [ token ]);

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!decodedToken, decodedToken, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
