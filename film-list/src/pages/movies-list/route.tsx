import type { RouteObject } from 'react-router-dom';

export const moviesListRoute: RouteObject = {
  path: '/movies',
    lazy: () =>
    import('./ui').then(m => ({
      Component: m.MoviesListPage,
    })),
};