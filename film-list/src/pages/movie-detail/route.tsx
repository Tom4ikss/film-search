import type { RouteObject } from 'react-router-dom';

export const movieDetailRoute: RouteObject = {
  path: 'movies/:id',
    lazy: () =>
    import('./ui').then(m => ({
      Component: m.MovieDetailPage,
    })),
};