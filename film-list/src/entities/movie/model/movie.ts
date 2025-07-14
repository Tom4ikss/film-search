import { z } from 'zod';

const genres = [
  {
    "name": "аниме",
    "slug": "anime"
  },
  {
    "name": "биография",
    "slug": "biografiya"
  },
  {
    "name": "боевик",
    "slug": "boevik"
  },
  {
    "name": "вестерн",
    "slug": "vestern"
  },
  {
    "name": "военный",
    "slug": "voennyy"
  },
  {
    "name": "детектив",
    "slug": "detektiv"
  },
  {
    "name": "детский",
    "slug": "detskiy"
  },
  {
    "name": "для взрослых",
    "slug": "dlya-vzroslyh"
  },
  {
    "name": "документальный",
    "slug": "dokumentalnyy"
  },
  {
    "name": "драма",
    "slug": "drama"
  },
  {
    "name": "игра",
    "slug": "igra"
  },
  {
    "name": "история",
    "slug": "istoriya"
  },
  {
    "name": "комедия",
    "slug": "komediya"
  },
  {
    "name": "концерт",
    "slug": "koncert"
  },
  {
    "name": "короткометражка",
    "slug": "korotkometrazhka"
  },
  {
    "name": "криминал",
    "slug": "kriminal"
  },
  {
    "name": "мелодрама",
    "slug": "melodrama"
  },
  {
    "name": "музыка",
    "slug": "muzyka"
  },
  {
    "name": "мультфильм",
    "slug": "multfilm"
  },
  {
    "name": "мюзикл",
    "slug": "myuzikl"
  },
  {
    "name": "новости",
    "slug": "novosti"
  },
  {
    "name": "приключения",
    "slug": "priklyucheniya"
  },
  {
    "name": "реальное ТВ",
    "slug": "realnoe-TV"
  },
  {
    "name": "семейный",
    "slug": "semeynyy"
  },
  {
    "name": "спорт",
    "slug": "sport"
  },
  {
    "name": "ток-шоу",
    "slug": "tok-shou"
  },
  {
    "name": "триллер",
    "slug": "triller"
  },
  {
    "name": "ужасы",
    "slug": "uzhasy"
  },
  {
    "name": "фантастика",
    "slug": "fantastika"
  },
  {
    "name": "фильм-нуар",
    "slug": "film-nuar"
  },
  {
    "name": "фэнтези",
    "slug": "fentezi"
  },
  {
    "name": "церемония",
    "slug": "ceremoniya"
  }
] as const // 32
export const genresNames = genres.map(genreObject => genreObject.name)

export type GenreName = (typeof genres)[number]['name']

const ratingNumber = z.number().min(0).max(9.9);
const CURRENT_YEAR = new Date().getFullYear();
const yearNum = z.number().int().min(1950).max(CURRENT_YEAR);

const RatingRangeTuple = z
  .tuple([ratingNumber, ratingNumber])
  .refine(([min, max]) => min <= max, { message: 'min ≤ max' });

const YearRangeTuple = z
  .tuple([yearNum, yearNum])
  .refine(([min, max]) => min <= max, { message: 'min ≤ max' });

const GenreNameSchema = z.enum(genresNames);

const GenreFilterSchema = z.object({
  include: z.array(GenreNameSchema),
  exclude: z.array(GenreNameSchema),
})
.refine(
  ({ include, exclude }) =>
    include.every(g => !exclude.includes(g)),
  { message: 'Жанр не может одновременно включаться и исключаться' }
);

export interface GenreFilter {
  include: GenreName[];
  exclude: GenreName[];
}

export const MoviesFilterSchema = z.object({
  genre: GenreFilterSchema.optional(),
  year: YearRangeTuple.optional(),
  rating: RatingRangeTuple.optional(),
});

export type MoviesFilter = z.infer<typeof MoviesFilterSchema>;

export const MovieCardSchema = z.object({
  id: z.number(),
  name: z.string(),
  year: z.number(),
  poster: z.object({
    url: z.string().url(),
  }),
  rating: z.object({
    kp: z.number(),
  }),
});

export type Movie = z.infer<typeof MovieCardSchema>;

export const MovieDetailsSchema = MovieCardSchema.extend({
  description: z.string().nullable(),
  genres: z.array(z.object({ name: z.string() })),
});

export type MovieDetails = z.infer<typeof MovieDetailsSchema>;