import './static/sass/app.scss';

import { HomePage } from './pages/HomePage';
import { LogInPage } from './pages/LogInPage';
import { AdminPage } from './pages/AdminPage';
import { useAuth } from './context/authContext';
import { useNav } from './context/navContext';

export const App = () => {
  const { isLoggedIn } = useAuth();
  const { path } = useNav();

  if (path === '/log-in') {
    return <LogInPage />;
  }

  if (path === '/admin') {
    return isLoggedIn ? <AdminPage /> : <LogInPage />;
  }

  return <HomePage />;
};
