import { JSONResponse } from 'models/types';
import { getIdFromUrl } from '../utils';
import { getArray, getDate, getNumber, getString } from 'utils/types';
import { Film } from '../models/film';

export const mapToFilm = (filmResponse: JSONResponse) => {
  const id = getIdFromUrl(getString(filmResponse.url));
  const item: Film = {
    id,
    title: getString(filmResponse.title),
    episodeId: getNumber(filmResponse.episode_id),
    openingCrawl: getString(filmResponse.opening_crawl),
    director: getString(filmResponse.director),
    producer: getString(filmResponse.producer),
    releaseDate: getString(filmResponse.release_date),
    characters: getArray(filmResponse.characters).map((char) => getIdFromUrl(getString(char))),
    planets: getArray(filmResponse.planets).map((planet) => getIdFromUrl(getString(planet))),
    starships: getArray(filmResponse.starships).map((starship) => getIdFromUrl(getString(starship))),
    vehicles: getArray(filmResponse.vehicles).map((vehicle) => getIdFromUrl(getString(vehicle))),
    species: getArray(filmResponse.species).map((species) => getIdFromUrl(getString(species))),
    created: getDate(getString(filmResponse.created)),
    edited: getDate(getString(filmResponse.edited)),
  };
  return { id, item };
};
