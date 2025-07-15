import type { Movie } from "@/entities/movie/model/movie";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesStore {
  favorites: Record<string, Movie>;
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: {},
      addFavorite: (movie) =>
        set((state) => ({
          favorites: {
            ...state.favorites,
            [movie.id]: movie,
          },
        })),
      removeFavorite: (id) =>
        set((state) => {
          const newFavorites = { ...state.favorites };
          delete newFavorites[id];
          return { favorites: newFavorites };
        }),
      isFavorite: (id) => !!get().favorites[id],
    }),
    {
      name: "favorite-movies",
    },
  ),
);

export const getScrollState = () => {};
