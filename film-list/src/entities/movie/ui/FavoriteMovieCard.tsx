import type { Movie } from "../model/movie";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { FavoriteButton } from "@/widgets/favorite-button/ui";

export const FavoriteMovieCard = ({ movie }: { movie: Movie }) => {
  const location = useLocation();

  return (
    <Grid key={movie.id} size={{ xs: 6, md: 3 }} sx={{ minWidth: "300px" }}>
      <Card
        elevation={3}
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Box
          component={Link}
          to={`/movies/${movie.id}${location.search}`}
          sx={{ textDecoration: "none" }}
        >
          <CardMedia
            component="img"
            image={movie.poster.url}
            alt={movie.name}
            sx={{ objectFit: "cover", objectPosition: "top", height: "30em" }}
          />

          <CardContent sx={{ pb: 1.5 }}>
            <Typography variant="subtitle1" noWrap>
              {movie.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Рейтинг KP:&nbsp;
              <Box
                component="span"
                sx={{ color: "warning.main", fontWeight: 500 }}
              >
                {movie.rating.kp}
              </Box>
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Год:&nbsp;
              <Box component="span" sx={{ fontWeight: 500 }}>
                {movie.year}
              </Box>
            </Typography>
          </CardContent>
        </Box>

        <CardActions sx={{ justifyContent: "flex-end", pt: 0, pb: 1 }}>
          <FavoriteButton movie={movie} />
        </CardActions>
      </Card>
    </Grid>
  );
};
