import { combineReducers } from '@reduxjs/toolkit';
import { films, people, planets, species, starships, vehicles } from '@features/swapi/swapiSlices';

const swapiReducer = combineReducers({
  films: films.reducer,
  people: people.reducer,
  planets: planets.reducer,
  species: species.reducer,
  starships: starships.reducer,
  vehicles: vehicles.reducer,
});

export default swapiReducer;
