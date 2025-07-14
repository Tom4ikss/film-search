import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routeConfig } from '@/shared/config/route';

const router = createBrowserRouter(routeConfig);

export const AppRouter = () => (
  <RouterProvider router={router} />
);