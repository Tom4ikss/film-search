import { http } from "@/shared/api/axios";
import { MOVIES_PAGE_LIMIT } from "@/shared/config";
import {
  MovieCardSchema,
  MovieDetailsSchema,
  type Movie,
  type MovieDetails,
  type MoviesFilter,
} from "@/entities/movie/model/movie";
import { filtersToSearchParams } from "@/features/filters";

const FIELDS_CARD: string[] = ["id", "name", "year", "poster", "rating"];
const NOT_NULL_FILEDS: string[] = [
  "id",
  "name",
  "year",
  "poster.url",
  "rating.kp",
  "genres.name",
]; //на всякий случай добавил жанры, описание не стал добавлять хотя тоже можно
const FIELDS_DETAIL: string[] = [
  "id",
  "name",
  "year",
  "poster.url",
  "rating.kp",
  "description",
  "genres.name",
];

export type InfiniteMovies = {
  items: Movie[];
  nextPage: number | null;
  prevPage: number | null;
};

export async function fetchMovies(
  filters: MoviesFilter,
  page: number = 1,
  limit: number = MOVIES_PAGE_LIMIT,
  signal?: AbortSignal,
): Promise<InfiniteMovies> {
  const params = filtersToSearchParams(filters);

  params.set("page", String(page));
  params.set("limit", String(limit));
  FIELDS_CARD.forEach((p) => params.append("selectFields", p));
  NOT_NULL_FILEDS.forEach((p) => params.append("notNullFields", p));

  const { data } = await http.get("/movie", {
    params: params,
    signal,
  });
  console.log(data);
  return {
    items: data.docs.map(MovieCardSchema.parse),
    nextPage: data.page < data.pages ? data.page + 1 : null,
    prevPage: data.page > 1 ? data.page - 1 : null,
  };
}

export async function fetchMovie(
  id: string,
  signal?: AbortSignal,
): Promise<MovieDetails> {
  const { data } = await http.get(`/movie/${id}`, {
    params: { selectFields: FIELDS_DETAIL },
    signal,
  });

  return MovieDetailsSchema.parse(data);
}
