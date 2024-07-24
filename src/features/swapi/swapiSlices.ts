import { JSONResponse } from 'models/types';
import { Base } from './models/base';
import { mapToPerson } from './mappers/personMapper';
import { mapToFilm } from './mappers/filmMapper';
import { mapToPlanet } from './mappers/planetMapper';
import { mapToSpecies } from './mappers/speciesMapper';
import { mapToStarship, mapToVehicle } from './mappers/transportMapper';
import { createSliceFor } from './utils';

type Mapper<T extends Base> = (response: JSONResponse) => {
  id: number;
  item: T;
};

const createSliceDetails = <T extends Base>(apiPath: string, mapper: Mapper<T>) => {
  const { slice, fetchList, fetchItem } = createSliceFor(apiPath, mapper);
  const { search, nextPage, prevPage } = slice.actions;
  return { reducer: slice.reducer, fetchList, fetchItem, search, nextPage, prevPage };
};

export const films = createSliceDetails('films', mapToFilm);
export const people = createSliceDetails('people', mapToPerson);
export const planets = createSliceDetails('planets', mapToPlanet);
export const species = createSliceDetails('species', mapToSpecies);
export const starships = createSliceDetails('starships', mapToStarship);
export const vehicles = createSliceDetails('vehicles', mapToVehicle);
