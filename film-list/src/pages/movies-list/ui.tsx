import { useRememberSearchParams } from "@/shared/lib/useRememberSearchParams";
import { LoadingWrapper } from "@/shared/ui/LoadingWrapper";
import { FilterPanel } from "@/widgets/filter-panel";
import { MoviesVirtualList } from "@/widgets/movies-virtual-list";
import Grid from "@mui/material/Grid";

export const MoviesListPage = () => {
  //const isRestored = useRememberSearchParams()

  //console.log(isRestored)

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 4, lg: 5 }}>
        <FilterPanel />
      </Grid>

      <Grid size={{ xs: 12, md: 8, lg: 7 }}>
        <MoviesVirtualList />
      </Grid>
    </Grid>
  );
};
