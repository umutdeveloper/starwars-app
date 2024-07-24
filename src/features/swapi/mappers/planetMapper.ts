import { JSONResponse } from 'models/types';
import { getIdFromUrl, parseNumber } from '../utils';
import { getArray, getDate, getString } from 'utils/types';
import { Planet } from '../models/planet';

export const mapToPlanet = (planetResponse: JSONResponse) => {
  const id = getIdFromUrl(getString(planetResponse.url));
  const item: Planet = {
    id,
    name: getString(planetResponse.name),
    rotationPeriod: parseNumber(getString(planetResponse.rotation_period)),
    orbitalPeriod: parseNumber(getString(planetResponse.orbital_period)),
    diameter: parseNumber(getString(planetResponse.diameter)),
    climate: getString(planetResponse.climate),
    gravity: getString(planetResponse.gravity),
    terrain: getString(planetResponse.terrain),
    surfaceWater: parseNumber(getString(planetResponse.surface_water)),
    population: parseNumber(getString(planetResponse.population)),
    residents: getArray(planetResponse.residents).map((resident) => getIdFromUrl(getString(resident))),
    films: getArray(planetResponse.films).map((film) => getIdFromUrl(getString(film))),
    created: getDate(getString(planetResponse.created)),
    edited: getDate(getString(planetResponse.edited)),
  };
  return { id, item };
};
