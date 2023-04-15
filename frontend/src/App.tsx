import './static/sass/app.scss';

import { HomePage } from './pages/HomePage';
import { LogInPage } from './pages/LogInPage';
import { AdminPage } from './pages/AdminPage';

export const App = () => {
  const path = window.location.pathname;

  if (path === '/login') {
    return <LogInPage />;
  }

  if (path === '/admin') {
    return <AdminPage />;
  }

  return <HomePage />;
};
