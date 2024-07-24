import { AppBar, Toolbar, Typography, Button, Container, CssBaseline, Grid } from '@mui/material';
import { people } from '@features/swapi/swapiSlices';
import './App.css';
import { useEffect } from 'react';
import { useAppDispatch } from '@hooks/redux';


function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(people.fetchList({ page: 1, search: '' }));
  }, [dispatch])

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Starwars App
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Grid container spacing={2} justifyContent="center" alignItems="center" direction="column" sx={{ mt: 4 }}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome to Star Wars List
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              Update the player counts here
            </Typography>
          </Grid>
          <Grid item xs={12} container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
              <Button variant="contained">-</Button>
            </Grid>
            <Grid item>
              <Typography variant="h4">0</Typography>
            </Grid>
            <Grid item>
              <Button variant="contained">+</Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Star Wars Characters:
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
