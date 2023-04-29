import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';

import { App } from './App';
import { AuthProvider } from './context/authContext';
import { NavProvider } from './context/navContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <AuthProvider>
      <NavProvider>
        <App />
      </NavProvider>
    </AuthProvider>
  </StrictMode>
);
