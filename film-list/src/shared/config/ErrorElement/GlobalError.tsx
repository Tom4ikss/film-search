import { Box, Button, Paper, Typography } from '@mui/material';

export const GlobalError = () => {

  const onClick = () => {
    sessionStorage.clear()
    location.reload()
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
      color="text.primary"
      px={2}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 500,
          width: '100%',
          p: 4,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom color='secondary'>
          Упс… Что-то пошло не так
        </Typography>

        <Typography variant="body1" gutterBottom>
          Обновите страницу или вернитесь позже.
      </Typography>

        <Button
          variant="contained"
          onClick={onClick}
          sx={{ mt: 2 }}
        >
          Обновить
        </Button>
      </Paper>
    </Box>
  );
}