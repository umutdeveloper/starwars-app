import { CssBaseline } from '@mui/material';
import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from 'components/Layout';
import { useAppDispatch } from '@hooks/redux';
import { people } from '@features/swapi/swapiSlices';
import { Routes as PageRoutes } from 'utils/routes';
import './App.css';

const People = lazy(() => import('./pages/People'));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(people.fetchList({ page: 1, search: '' }));
  }, [dispatch])

  return (
    <>
      <CssBaseline />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to={PageRoutes.People} replace />} />
              <Route path={PageRoutes.People} element={<People />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
