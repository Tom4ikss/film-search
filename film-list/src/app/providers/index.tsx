import { QueryProvider } from "./query";
import { AppRouter } from "./router";
import { MUIThemeProvider } from "./theme";

export const AppProviders = () => {
  return (
    <MUIThemeProvider>
      <QueryProvider>
        <AppRouter></AppRouter>
      </QueryProvider>
    </MUIThemeProvider>
  );
};
