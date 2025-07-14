import {
  Box,
  Grid,
  Paper,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Slider,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { genresNames, type GenreName, type MoviesFilter } from '@/entities/movie/model/movie';
import { useFilters } from '@/features/filters';

const CURRENT_YEAR = (new Date()).getFullYear()

export const FilterPanel = () => {

  const {filters, setFilters, clearFilters} = useFilters()

  const [include, setInclude] = useState<GenreName[]>(filters.genre?.include ?? []);
  const [exclude, setExclude] = useState<GenreName[]>(filters.genre?.exclude ?? []);
  const [year, setYear] = useState<[number, number]>(filters.year ?? [2000, CURRENT_YEAR]);
  const [rating, setRating] = useState<[number, number]>(filters.rating ?? [0, 10]);

  const toggleInclude = (genre: GenreName) => {
    if (include.includes(genre)) {
      setInclude(include.filter((g) => g !== genre));
    } else {
      setInclude([...include, genre]);
      setExclude(exclude.filter((g) => g !== genre));
    }
  };

  const toggleExclude = (genre: GenreName) => {
    if (exclude.includes(genre)) {
      setExclude(exclude.filter((g) => g !== genre));
    } else {
      setExclude([...exclude, genre]);
      setInclude(include.filter((g) => g !== genre));
    }
  };

  const applyFilters = () => {
    const filtersObject: MoviesFilter = {
      genre: { include, exclude },
      year,
      rating,
    };
    setFilters(filtersObject)
  };

  const clear = () => {
    setInclude([])
    setExclude([])
    setYear([2000, CURRENT_YEAR])
    setRating([0, 10])
    clearFilters()
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
  <Grid container spacing={3}>
    <Grid container spacing={2} size={{ xs: 12 }}>
      <Grid size={{ xs: 6 }}>
        <Typography variant="subtitle1" fontWeight={600}>Жанры (Включить)</Typography>
        <Box
          sx={{
            border: '1px solid #ccc',
            borderRadius: 1,
            p: 1,
            maxHeight: 300,
            scrollbarWidth: 'none',
            overflowY: 'auto',
            mt: 1,
          }}
        >
          <FormGroup>
            {genresNames.map((genre) => (
              <FormControlLabel
                key={genre}
                control={
                  <Checkbox
                    checked={include.includes(genre)}
                    onChange={() => toggleInclude(genre)}
                  />
                }
                label={genre}
              />
            ))}
          </FormGroup>
        </Box>
      </Grid>

      <Grid size={{ xs: 6 }}>
        <Typography variant="subtitle1" fontWeight={600}>Жанры (Исключить)</Typography>
        <Box
          sx={{
            border: '1px solid #ccc',
            borderRadius: 1,
            p: 1,
            maxHeight: 300,
            overflowY: 'auto',
            scrollbarWidth: 'none',
            mt: 1,
          }}
        >
          <FormGroup>
            {genresNames.map((genre) => (
              <FormControlLabel
                key={genre}
                control={
                  <Checkbox
                    checked={exclude.includes(genre)}
                    onChange={() => toggleExclude(genre)}
                  />
                }
                label={genre}
              />
            ))}
          </FormGroup>
        </Box>
      </Grid>
    </Grid>

    <Grid container spacing={2} size={{ xs: 12 }}>
      <Grid >
        <Typography variant="subtitle1" fontWeight={600}>Год выпуска</Typography>
        <Box display="flex" gap={2} mt={1}>
          <TextField
            label="От"
            type="number"
            size="small"
            value={year[0]}
            onChange={(e) => {
              const y = +e.target.value
              if(y>year[1]) return setYear([y, y])
              else return setYear([y, year[1]])
            }}
            inputProps={{min: 1950, max: CURRENT_YEAR}}
            fullWidth
          />
          <TextField
            label="До"
            type="number"
            size="small"
            value={year[1]}
            onChange={(e) => setYear([year[0], +e.target.value])}
            inputProps={{min: 1950, max: CURRENT_YEAR}}
            fullWidth
          />
        </Box>
      </Grid>

      <Grid size={{ xs: 12, md: 9 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Рейтинг (от {rating[0]} до {rating[1]})
        </Typography>
        <Slider
          value={rating}
          onChange={(_, newValue) => setRating(newValue as [number, number])}
          min={0}
          max={10}
          step={0.1}
          valueLabelDisplay="auto"
        />
      </Grid>
    </Grid>

    <Grid
      size={{ xs: 12 }}
      display="flex"
      justifyContent="flex-end"
      gap={2}
      alignItems="center"
    >
      <Button variant="outlined" onClick={clear}>Очистить</Button>
      <Button variant="contained" onClick={applyFilters}>Применить</Button>
    </Grid>
  </Grid>
</Paper>
  );
};
