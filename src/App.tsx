import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline, Grid } from '@mui/material';
import { increment, decrement, selectCount } from '@features/counter/counterSlice';
import './App.css';

function App() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

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
              <Button variant="contained" onClick={() => dispatch(decrement())}>-</Button>
            </Grid>
            <Grid item>
              <Typography variant="h4">{count}</Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => dispatch(increment())}>+</Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" align="center">
              Coming soon...
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
