import { Box, CircularProgress } from "@mui/material";
import type { ReactNode } from "react";

const Loader = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 300,
    }}
  >
    <CircularProgress />
  </Box>
);

export const LoadingWrapper = ({
  children,
  isLoading,
}: {
  children: ReactNode;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};
