import { fetchMovies, type InfiniteMovies } from "@/shared/api/movies";
import type { MoviesFilter } from "@/entities/movie/model/movie";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { MoviesData } from "@/entities/movie/model/movieData";
import type { ListOnItemsRenderedProps } from "react-window";

const FETCH_NEXT_PAGE_GAP = 30;
const FETCH_PREV_GAP = 30;

export const useInfiniteMovies = (filters: MoviesFilter, initialPage = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const infiniteQueryResult = useInfiniteQuery<InfiniteMovies, number>({
    queryKey: ["movies", filters],
    queryFn: ({ pageParam, signal }) =>
      fetchMovies(filters, pageParam as number, undefined, signal),
    initialPageParam: initialPage,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    getPreviousPageParam: (firstPage) => firstPage.prevPage ?? undefined,
    staleTime: 5 * 60_000,
    refetchOnWindowFocus: false,
    retry: 0,
  });

  const {
    data,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isLoading,
  } = infiniteQueryResult;

  const moviesData = useMemo(() => new MoviesData(data), [data]);

  const handelRender = (
    props: ListOnItemsRenderedProps,
    moviesData: MoviesData<InfiniteMovies>,
  ) => {
    const pageIndex = moviesData.getPage(props.visibleStopIndex);
    if (pageIndex !== currentPage) {
      setCurrentPage(pageIndex);
    }

    if (
      props.overscanStopIndex >=
        moviesData.getPotentialItemsCount() - FETCH_NEXT_PAGE_GAP &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      console.log("fetch next page");
      const fetchNextPromise = fetchNextPage();
      moviesData.preloadNextPage(fetchNextPromise);
    }

    if (
      moviesData.hasGap() &&
      props.visibleStartIndex <= moviesData.getGapEnd()! + FETCH_PREV_GAP &&
      hasPreviousPage &&
      !isFetchingPreviousPage
    ) {
      console.log("fetch prev page");
      fetchPreviousPage();
    }
  };

  return { moviesData, currentPage, isLoading, handelRender };
};
