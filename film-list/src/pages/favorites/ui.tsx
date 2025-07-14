import { useFavoritesStore } from '@/shared/store/favoritesStore';
import {
  Grid,
  Typography,
  Paper,
} from '@mui/material';
import { FavoriteMovieCard } from '@/entities/movie/ui/FavoriteMovieCard';

export const FavoritesPage = () => {

  const movies = Object.values(useFavoritesStore((s) => s.favorites));

  return (
    <Paper elevation={0} sx={{ p: 4, mt: -5 }}>

      {movies.length === 0 ? (
        <Typography variant="h4" component="h1" fontWeight={700} sx={{ textAlign: 'center', width: '100%' }}>У вас пока нет избранных фильмов.</Typography>
      ) : (
        <Grid container spacing={3}>
          {movies.map((movie) => (
           <FavoriteMovieCard movie={movie}/>
          ))}
        </Grid>
      )}
    </Paper>
  );
};