import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Chip,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { FavoriteButton } from '@/widgets/favorite-button/ui';
import { useMovie } from '@/features/select-movie';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const MovieDetailCard = ({ id }: { id: string }) => {
  const { data, isLoading } = useMovie(id);
  const movie = useMemo(() => data ?? null, [data]);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Box sx={{ height: 380, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!movie) {
    return (
      <Alert severity="error" sx={{ height: 380, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Фильм не найден
      </Alert>
    );
  }

  return (
    <Paper elevation={3} sx={{ maxWidth: 900, mx: 'auto', p: 3, mt: -5, maxHeight: '600px' }}>
      <Grid container spacing={3}>
        {/* Постер */}
        <Grid size={{xs: 12, md: 4}}>
          <Box
            component="img"
            src={movie.poster.url}
            alt={movie.name}
            sx={{
              width: '100%',
              borderRadius: 2,
              boxShadow: 2,
              objectFit: 'cover',
            }}
          />
        </Grid>

        <Grid
  size={{ xs: 12, md: 8 }}
  sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
>
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
    <Typography variant="h4" component="h1" fontWeight={700}>
      {movie.name}
    </Typography>
    <FavoriteButton movie={movie} />
  </Box>

  <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line', maxWidth: '95%' }}>
    {movie.description ?? 'Описание фильма отсутствует.'}
  </Typography>

  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 1 }}>
    <Typography variant="body2">
      <strong>Год:</strong> {movie.year}
    </Typography>
    <Typography variant="body2">
      <strong>Рейтинг:</strong>{' '}
      <Box component="span" sx={{ color: 'warning.main', fontWeight: 500 }}>
        {movie.rating.kp}
      </Box>
    </Typography>
  </Box>

  {movie.genres.length > 0 && (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
      {movie.genres.map((g) => (
        <Chip key={g.name} label={g.name} color="primary" variant="outlined" size="small" />
      ))}
    </Box>
  )}
</Grid>
      </Grid>

      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mt: 4, alignSelf: 'center' }}
      >
        Назад
      </Button>
    </Paper>
  );
};