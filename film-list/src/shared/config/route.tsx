import { GlobalError } from '@/app/providers/ui/GlobalError';
import { favoritesRoute } from '@/pages/favorites/route';
import { movieDetailRoute } from '@/pages/movie-detail/route';
import { moviesListRoute } from '@/pages/movies-list/route';
import { Header } from '@/widgets/header';
import { Navigate, Outlet, type RouteObject } from 'react-router-dom';

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const defaultRoute: RouteObject = {
  index: true,

  element: <Navigate to={"/movies"} replace/>
}

export const routeConfig: RouteObject[] = [
  {
    element: <Layout />,
    errorElement: <GlobalError/>,
    children: [moviesListRoute, movieDetailRoute, favoritesRoute, defaultRoute],
  },
];