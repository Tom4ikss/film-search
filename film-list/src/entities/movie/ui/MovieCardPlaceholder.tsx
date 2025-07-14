import { Card, CardContent, Skeleton } from "@mui/material";

export const MovieCardPlaceholder = () => {
  return (
    <Card
      elevation={2}
      sx={{
        height: '98%',
        display: 'flex',
        px: 2,
        py: 1,
        alignItems: 'flex-start',
        gap: 2,
      }}
    >
      <Skeleton variant="rectangular" width={120} height={180} sx={{ borderRadius: 1 }} />

      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 }, flexGrow: 1 }}>
        <Skeleton variant="text" width="60%" height={28} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="40%" height={20} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="30%" height={20} />
      </CardContent>
    </Card>
  );
};