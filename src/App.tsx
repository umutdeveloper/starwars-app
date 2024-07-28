import { Routes, Route, Navigate } from 'react-router-dom';
import loadable from '@loadable/component';
import Layout from 'components/Layout';
import { Routes as PageRoutes } from 'utils/routes';
import './App.css';

const People = loadable(() => import('./pages/People'));
const Films = loadable(() => import('./pages/Films'));
const Planets = loadable(() => import('./pages/Planets'));
const Species = loadable(() => import('./pages/Species'));
const Starships = loadable(() => import('./pages/Starships'));
const Vehicles = loadable(() => import('./pages/Vehicles'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to={PageRoutes.People} replace />} />
        <Route path={PageRoutes.People} element={<People />} />
        <Route path={PageRoutes.Films} element={<Films />} />
        <Route path={PageRoutes.Planets} element={<Planets />} />
        <Route path={PageRoutes.Species} element={<Species />} />
        <Route path={PageRoutes.Starships} element={<Starships />} />
        <Route path={PageRoutes.Vehicles} element={<Vehicles />} />
      </Route>
    </Routes>
  );
}

export default App;
