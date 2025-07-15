import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from '@mui/material';
import type { Movie } from '../model/movie';
import { FavoriteButton } from '@/widgets/favorite-button/ui';

export const MovieCard = ({ movie }: { movie: Movie }) => {

  const location = useLocation()

  return <Card
    elevation={3}
    sx={{
      height: '98%',
      display: 'flex',
      flexDirection: 'column',
      p: 2,
      gap: 2,
    }}
  >
    <CardActionArea
      component={RouterLink}
      to={`/movies/${movie.id}${location.search}`}
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'flex-start',
      }}
    >
      <CardMedia
        component="img"
        image={movie.poster.url}
        alt={''}
        loading="lazy"
        sx={{
          width: 120,
          height: 180,
          borderRadius: 2,
          flexShrink: 0,
          boxShadow: 1,
        }}
      />

      <CardContent sx={{ px: 0, py: 0, flexGrow: 1 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {movie.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Год:&nbsp;
          <Box component="span" sx={{ fontWeight: 500, color: 'text.primary' }}>
            {movie.year}
          </Box>
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Рейтинг:&nbsp;
          <Box component="span" sx={{ fontWeight: 500, color: 'warning.main' }}>
            {Math.floor(movie.rating.kp)}
          </Box>
        </Typography>
      </CardContent>
    </CardActionArea>

    <Box display="flex" justifyContent="flex-end">
      <FavoriteButton movie={movie} />
    </Box>
  </Card>
};