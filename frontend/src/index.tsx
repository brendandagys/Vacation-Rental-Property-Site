import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';

import { App } from './App';
import { AuthProvider } from './context/authContext';
import { NavProvider } from './context/navContext';
import { CalendarsDataProvider } from './context/calendarsDataContext';
import { LanguageProvider } from './context/languageContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <NavProvider>
          <CalendarsDataProvider>
            <App />
          </CalendarsDataProvider>
        </NavProvider>
      </AuthProvider>
    </LanguageProvider>
  </StrictMode>
);
