import { JSONResponse } from 'models/types';
import { getIdFromUrl, parseNumber } from '../utils';
import { getArray, getDate, getString } from 'utils/types';
import { Species } from '../models/species';

export const mapToSpecies = (speciesResponse: JSONResponse) => {
  const id = getIdFromUrl(getString(speciesResponse.url));
  const item: Species = {
    id,
    name: getString(speciesResponse.name),
    classification: getString(speciesResponse.classification),
    designation: getString(speciesResponse.designation),
    averageHeight: parseNumber(getString(speciesResponse.average_height)),
    skinColors: getString(speciesResponse.skin_colors)
      .split(',')
      .map((color) => color.trim()),
    hairColors: getString(speciesResponse.hair_colors)
      .split(',')
      .map((color) => color.trim()),
    eyeColors: getString(speciesResponse.eye_colors)
      .split(',')
      .map((color) => color.trim()),
    averageLifespan: parseNumber(getString(speciesResponse.average_lifespan)),
    homeworld: getIdFromUrl(getString(speciesResponse.homeworld, '')),
    language: getString(speciesResponse.language),
    people: getArray(speciesResponse.people).map((person) => getIdFromUrl(getString(person))),
    films: getArray(speciesResponse.films).map((film) => getIdFromUrl(getString(film))),
    created: getDate(getString(speciesResponse.created)),
    edited: getDate(getString(speciesResponse.edited)),
  };
  return { id, item };
};
