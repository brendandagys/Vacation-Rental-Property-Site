import { createContext, useContext, useEffect, useState } from 'react';
import { Nullable } from '../types';
import { validateToken } from '../api/authentication';
import { IJwtToken } from '../types/authentication';

interface IAuthContext {
  isLoggedIn: boolean;
  decodedToken: Nullable<IJwtToken>;
  validateTokenAndSetDecodedToken: (token: string) => Promise<void>;
}

const getToken = (): Nullable<string> => localStorage.getItem('token');

export const AuthContext = createContext({} as IAuthContext);

let fetchedOnce = false;

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
  const [ decodedToken, setDecodedToken ] = useState<Nullable<IJwtToken>>(null);

  const validateTokenAndSetDecodedToken = async (token: string): Promise<void> => {
    setDecodedToken(await validateToken(token));
  };

  useEffect(() => {
    if (!fetchedOnce) {
      fetchedOnce = true;

      const storedToken = getToken();
      storedToken && void validateTokenAndSetDecodedToken(storedToken);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!decodedToken,
        decodedToken,
        validateTokenAndSetDecodedToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
