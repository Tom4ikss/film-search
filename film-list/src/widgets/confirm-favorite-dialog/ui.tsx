import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
  type SlideProps,
} from '@mui/material';
import { forwardRef } from 'react';
import type { Movie } from '@/entities/movie/model/movie';
import { useFavoritesStore } from '@/shared/store/favoritesStore';

/* анимация «вылет снизу» */
const Transition = forwardRef(function Transition(props: SlideProps, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ConfirmFavoriteDialogProps {
  open: boolean;
  movie: Movie;
  onConfirm?: () => void;
  onClose?: () => void;
}

export function ConfirmFavoriteDialog({
  open,
  movie,
  onConfirm,
  onClose,
}: ConfirmFavoriteDialogProps) {
 
   const isFavorite = useFavoritesStore((s) => s.isFavorite(String(movie.id)));
   const add = useFavoritesStore((s) => s.addFavorite);
   const remove = useFavoritesStore((s) => s.removeFavorite);

  return (
    <Dialog
      open={open}
      slots={{transition: Transition}}
      keepMounted
      onClose={onClose}
      aria-describedby="confirm-favorite-description"
    >
      <DialogTitle>{isFavorite ? 'Удалить из избранного?' : 'Добавить в избранное?'}</DialogTitle>

      <DialogContent>
        <DialogContentText id="confirm-favorite-description">
          {isFavorite
            ? `Хотите удалить «${movie.name}» из избранного?`
            : `Хотите добавить «${movie.name}» в список избранных?`}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={() => {
            if(isFavorite) remove(String(movie.id))
            else add(movie)
            if(onConfirm) onConfirm()
            if(onClose) onClose()
        }}>
          {isFavorite ? 'Удалить' : 'Добавить' }
        </Button>
      </DialogActions>
    </Dialog>
  );
}
