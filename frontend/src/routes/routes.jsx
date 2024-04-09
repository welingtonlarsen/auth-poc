import {
  createBrowserRouter,
  Navigate,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import HomePage from '../pages/Home';
import RegisterPage from '../pages/Register';
import { useSelector } from 'react-redux';
import globalRouter from '../config/globalRouter';
import LoginPage from '../pages/Login';
import SingUpPage from '@/pages/Signup';

const RouteWall = ({ privateRoute }) => {
  const token = useSelector((state) => state.auth.token);

  const navigate = useNavigate();
  globalRouter.navigate = navigate;

  if (privateRoute) {
    const signed = !!token;
    return signed ? (
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-zinc-900 to-zinc-800">
        <Outlet />
      </div>
    ) : (
      <Navigate to="/login" />
    );
  } else {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-zinc-900 to-zinc-800">
        <Outlet />
      </div>
    );
  }
};
export const router = createBrowserRouter([
  // Private routes
  {
    path: '/',
    element: <RouteWall privateRoute />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
  // Public routes
  {
    path: '/',
    element: <RouteWall privateRoute={false} />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SingUpPage />,
      },
    ],
  },
]);
