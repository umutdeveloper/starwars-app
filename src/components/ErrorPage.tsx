import { Box, Button, Container, Stack, Typography } from '@mui/material';
import SnackBar from './SnackBar';

const BASE_HREF = import.meta.env.VITE_BASE_HREF;

interface ErrorPageProps {
  message: string;
}
function ErrorPage({ message }: ErrorPageProps) {
  const handleReload = () => window.location.reload();
  const handleHome = () => (window.location.href = BASE_HREF);
  return (
    <>
      <SnackBar severity="error" message={message} />
      <Container
        maxWidth="sm"
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Something went wrong :(
          </Typography>
          <Typography variant="body1" gutterBottom color="#999999">
            An unexpected error has occurred. Please try reloading the page.
          </Typography>
          <Stack direction="row" justifyContent="center" gap={3}>
            <Button variant="contained" color="primary" onClick={handleReload} sx={{ marginTop: 4 }}>
              Reload Page
            </Button>
            <Button variant="contained" color="primary" onClick={handleHome} sx={{ marginTop: 4 }}>
              Go Homepage
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
}

export default ErrorPage;
