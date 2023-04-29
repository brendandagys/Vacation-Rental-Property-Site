import { createContext, useContext, useState } from 'react';

interface IHistoryState {
  path: string;
}

interface INavContext {
  path: string;
  setPath: (path: string) => void;
}

export const NavContext = createContext({} as INavContext);

export const NavProvider = ({ children }: { children: React.ReactNode}) => {
  const [ path, _setPath ] = useState(location.pathname);

  // Update UI from browser navigation
  window.addEventListener('popstate', (e) => {
    _setPath((e.state as IHistoryState).path);
  });

  const setPath = (path: string) => {
    _setPath(path);
    history.pushState(null, '', path);
  };

  return (
    <NavContext.Provider
      value={{
        path,
        setPath,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

export const useNav = () => useContext(NavContext);
