import {
  MoviesFilterSchema,
  type GenreFilter,
  type GenreName,
  type MoviesFilter,
} from "@/entities/movie/model/movie";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

function parseGenres(raw: string[]): {
  include: GenreName[];
  exclude: GenreName[];
} {
  const include: GenreName[] = [];
  const exclude: GenreName[] = [];

  raw.forEach((token) => {
    if (token.startsWith("+")) include.push(token.slice(1) as GenreName);
    else if (token.startsWith("!")) exclude.push(token.slice(1) as GenreName);
  });

  return { include, exclude };
}

const getGenres = (genresObject: GenreFilter) => [
  ...genresObject.include.map((g) => `+${g}`),
  ...genresObject.exclude.map((g) => `!${g}`),
];

export function filtersToSearchParams(filters: MoviesFilter): URLSearchParams {
  const p = new URLSearchParams();

  const candidate = { ...filters };

  if (candidate.rating && candidate.rating[1] === 10) {
    candidate.rating = [candidate.rating[0], 9.9];
  }

  if (candidate.year && candidate.year[0] < 1950) {
    candidate.year = [1950, candidate.year[1]];
  }

  const result = MoviesFilterSchema.safeParse(candidate);

  if (result.success) {
    if (candidate.year) {
      p.set("year", `${candidate.year[0]}-${candidate.year[1]}`);
    }

    if (candidate.rating) {
      p.set("rating.kp", `${candidate.rating[0]}-${candidate.rating[1]}`);
    }

    if (candidate.genre) {
      for (let i of getGenres(candidate.genre)) {
        p.append("genres.name", i);
      }
    }
  }

  return p;
}

export function searchParamsToFilters(
  params: URLSearchParams | Record<string, string | string[]>,
): MoviesFilter {
  const p =
    params instanceof URLSearchParams
      ? params
      : new URLSearchParams(params as any);

  const candidate: Partial<MoviesFilter> = {};

  const yearRaw = p.get("year");
  if (yearRaw) {
    const [from, to] = yearRaw.split("-").map(Number);
    candidate.year = [from, to] as [number, number];
  }

  const ratingRaw = p.get("rating.kp");
  if (ratingRaw) {
    const [from, to] = ratingRaw.split("-").map(Number);
    candidate.rating = [from, to] as [number, number];
  }

  const genresRaw = p.getAll("genres.name");
  if (genresRaw.length) {
    const parsed = parseGenres(genresRaw);
    candidate.genre = parsed;
  }

  const result = MoviesFilterSchema.safeParse(candidate);
  return result.success ? result.data : {};
}

// export const useSyncSeacrhParamsAndFilters = () => {

//   const { filters, settedFrom, setFilters, setFromParams } = useFiltersStore()

//   const [searchParams, setSearchParams] = useSearchParams();

//   useEffect(() => {
//     console.log(searchParams)
//   }, [searchParams])

//   useEffect(() => {
//     if(settedFrom === 'store') {
//       console.log('change params')
//       setSearchParams(filtersToSearchParams(filters))
//     }
//   }, [filters])

// };

export const useFilters = (): {
  filters: MoviesFilter;
  setFilters: (filters: MoviesFilter) => void;
  clearFilters: () => void;
} => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setFilters = (filters: MoviesFilter) =>
    setSearchParams(filtersToSearchParams(filters));

  const clearFilters = () => setSearchParams();

  const filters: MoviesFilter = useMemo(
    () => searchParamsToFilters(searchParams),
    [searchParams],
  );

  return { filters, setFilters, clearFilters };
};
