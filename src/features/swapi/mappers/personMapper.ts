import { JSONResponse } from 'models/types';
import { getIdFromUrl } from '../utils';
import { getArray, getDate, getString } from 'utils/types';
import { Person } from '../models/person';

export const mapToPerson = (personResponse: JSONResponse) => {
  const id = getIdFromUrl(getString(personResponse.url));
  const item: Person = {
    id,
    name: getString(personResponse.name),
    height: getString(personResponse.height),
    mass: getString(personResponse.mass),
    hairColor: getString(personResponse.hair_color),
    skinColor: getString(personResponse.skin_color),
    eyeColor: getString(personResponse.eye_color),
    birthYear: getString(personResponse.birth_year),
    gender: getString(personResponse.gender),
    homeworld: getIdFromUrl(getString(personResponse.homeworld)),
    films: getArray(personResponse.films).map((film) => getIdFromUrl(getString(film))),
    species: getArray(personResponse.species).map((species) => getIdFromUrl(getString(species))),
    vehicles: getArray(personResponse.vehicles).map((vehicle) => getIdFromUrl(getString(vehicle))),
    starships: getArray(personResponse.starships).map((starship) => getIdFromUrl(getString(starship))),
    created: getDate(getString(personResponse.created)),
    edited: getDate(getString(personResponse.edited)),
  };
  return { id, item };
};
