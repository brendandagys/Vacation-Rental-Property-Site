import './static/sass/app.scss';

import { HomePage } from './pages/HomePage';
import { LogInPage } from './pages/LogInPage';
import { AdminPage } from './pages/AdminPage';
import { useAuth } from './context/authContext';

export const App = () => {
  const { isLoggedIn } = useAuth();

  const path = window.location.pathname;

  if (path === '/log-in') {
    return <LogInPage />;
  }

  if (!isLoggedIn) {
    return <HomePage />;
  }

  if (path === '/admin') {
    return <AdminPage />;
  }

  return <HomePage />;
};
