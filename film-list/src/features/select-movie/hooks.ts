import { fetchMovie } from "@/shared/api/movies";
import { useQuery, usePrefetchQuery } from "@tanstack/react-query";

export const useMovie = (id: string) =>
  useQuery({
    queryKey: ['movie', id],
    queryFn: ({ signal }) => fetchMovie(id, signal),
    refetchOnWindowFocus: false,
    retry: 0,
    staleTime: 10*60_000,
});

export const usePrefetchMovie = (id: string) => 
    usePrefetchQuery({
        queryKey: ['movie', id],
        queryFn: ({ signal }) => fetchMovie(id, signal),
        retry: 0,
        staleTime: 10*60_000,
    })