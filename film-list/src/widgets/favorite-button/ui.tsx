import type { Movie } from "@/entities/movie/model/movie";
import { useFavoritesStore } from "@/shared/store/favoritesStore";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import { ConfirmFavoriteDialog } from "../confirm-favorite-dialog/ui";

export const FavoriteButton = ({ movie }: { movie: Movie }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const isFavorite = useFavoritesStore((s) => s.isFavorite(String(movie.id)));

  return (
    <>
      <IconButton
        color={isFavorite ? "error" : "primary"}
        onClick={() => setDialogOpen(true)}
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      <ConfirmFavoriteDialog
        open={dialogOpen}
        movie={movie}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};
