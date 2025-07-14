import { FixedSizeList as List} from 'react-window';
import { useCallback, useEffect, useMemo, type CSSProperties } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useInfiniteMovies } from '@/features/infinite-movies';
import { MovieCard } from '@/entities/movie/ui/MovieCard';
import { useScrollPersist } from '@/shared/store/useScrollPersist';
import { MovieCardPlaceholder } from '@/entities/movie/ui/MovieCardPlaceholder';
import { MoviesData } from '@/entities/movie/model/movieData';
import { scrollBar } from '@/shared/theme';
import { useFilters } from '@/features/filters';



export const MoviesVirtualList = ({ itemHeight = 260 }) => {

  const { filters } = useFilters()
  
  const { listRef, save, restore } = useScrollPersist<List>(filters, 'movies')
  const { page: savedPage } = restore()

  const {
    data,
    handelRender,
    currentPage
  } = useInfiniteMovies(filters, savedPage);

  const moviesData = useMemo(
    () => new MoviesData(data),
    [data]
  );

  useEffect(() => {
    if(moviesData.hasData()) {
        moviesData.getMissingPages()
    }
  }, [moviesData])


  const Row = useCallback(
    ({ index, style }: {index: number, style: CSSProperties}) => {
      
      const movie = moviesData.getMovie(index);

      return (
        <div>
          <Box style={style} px={1} sx={{height: '10px'}}>
          {movie ? (
            <MovieCard movie={movie} />
          ) : (
            <MovieCardPlaceholder />
          )}
        </Box>

        </div>
      );
    },
    [moviesData]
  );


      if (!data?.pages.length) return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 320,
        }}
      >
        <CircularProgress />
      </Box>
  );

   const nothing =
    data?.pageParams.length === 1 &&
    data.pageParams[0] === 1 &&
    data.pages[0].items.length === 0;

  if (!data?.pages || nothing)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 320,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Ничего не найдено
        </Typography>
      </Box>
    );

  return (
    <Box sx={{ height: '100%', width: '100%', ...scrollBar }}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            width={width}
            itemCount={moviesData.getPotentialItemsCount()}
            itemSize={itemHeight}
            ref={listRef}
            onScroll={({ scrollOffset }) =>
              save({ page: currentPage, offset: scrollOffset })
            }
            onItemsRendered={(props) => handelRender(props, moviesData)}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </Box>
  )
};