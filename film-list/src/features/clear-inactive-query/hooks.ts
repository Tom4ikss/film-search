import type { Movie, MoviesFilter } from "@/entities/movie/model/movie";
import { useQueryClient, type InfiniteData } from "@tanstack/react-query";

export const useRemovePage = (filters: MoviesFilter) => {
  const key = ["movies", filters];

  const qc = useQueryClient();

  const removePage = (pageParamToDrop: number | string) => {
    qc.setQueryData<InfiniteData<Movie>>(key, (old) => {
      if (!old) return old;

      const idx = old.pageParams.findIndex((p) => p === pageParamToDrop);
      if (idx === -1) return old;

      return {
        ...old,
        pages: old.pages.slice(0, idx).concat(old.pages.slice(idx + 1)),
        pageParams: old.pageParams
          .slice(0, idx)
          .concat(old.pageParams.slice(idx + 1)),
      };
    });
  };

  return removePage;
};
