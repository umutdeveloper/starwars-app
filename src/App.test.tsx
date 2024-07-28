import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import mockStore from 'mockStore';
import { Provider } from 'react-redux';
import { Routes } from 'utils/routes';
import { Person } from '@features/swapi/models/person';
import { Film } from '@features/swapi/models/film';
import { Planet } from '@features/swapi/models/planet';
import { StarShip, Vehicle } from '@features/swapi/models/transport';
import { Species } from '@features/swapi/models/species';
import { SwapiState } from '@features/swapi/models/base';
import { initialState } from '@features/swapi/utils';

describe('App component', () => {
  beforeEach(() => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    vi.mock('./pages/People', () => ({ default: () => <div>People List</div> }));
    vi.mock('./pages/Films', () => ({ default: () => <div>Films List</div> }));
    vi.mock('./pages/Planets', () => ({ default: () => <div>Planets List</div> }));
    vi.mock('./pages/Species', () => ({ default: () => <div>Species List</div> }));
    vi.mock('./pages/Starships', () => ({ default: () => <div>Starships List</div> }));
    vi.mock('./pages/Vehicles', () => ({ default: () => <div>Vehicles List</div> }));
  });

  const store = mockStore({
    swapi: {
      people: { ...initialState } as SwapiState<Person>,
      films: { ...initialState } as SwapiState<Film>,
      planets: { ...initialState } as SwapiState<Planet>,
      starships: { ...initialState } as SwapiState<StarShip>,
      vehicles: { ...initialState } as SwapiState<Vehicle>,
      species: { ...initialState } as SwapiState<Species>,
    },
  });
  const renderByRoute = (path: string) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </Provider>
  );

  it('should render the People page by /', async () => {
    render(renderByRoute('/'));
    const text = await screen.findByText('People List');
    expect(text).toBeInTheDocument();
  });

  it('should render the People page by /people', async () => {
    render(renderByRoute(Routes.People));
    const text = await screen.findByText('People List');
    expect(text).toBeInTheDocument();
  });

  it('should render the Films page by /films', async () => {
    render(renderByRoute(Routes.Films));
    const text = await screen.findByText('Films List');
    expect(text).toBeInTheDocument();
  });

  it('should render the Planets page by /planets', async () => {
    render(renderByRoute(Routes.Planets));
    const text = await screen.findByText('Planets List');
    expect(text).toBeInTheDocument();
  });

  it('should render the Species page by /species', async () => {
    render(renderByRoute(Routes.Species));
    const text = await screen.findByText('Species List');
    expect(text).toBeInTheDocument();
  });

  it('should render the Starships page by /starships', async () => {
    render(renderByRoute(Routes.Starships));
    const text = await screen.findByText('Starships List');
    expect(text).toBeInTheDocument();
  });

  it('should render the Vehicles page by /vehicles', async () => {
    render(renderByRoute(Routes.Vehicles));
    const text = await screen.findByText('Vehicles List');
    expect(text).toBeInTheDocument();
  });
});
