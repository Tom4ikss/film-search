import type { RouteObject } from 'react-router-dom';

export const favoritesRoute: RouteObject = {
  path: 'favorites',
    lazy: () =>
    import('./ui').then(m => ({
      Component: m.FavoritesPage, // можно вернуть ещё loader / action
    })),
};