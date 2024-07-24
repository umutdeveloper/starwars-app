import { JSONResponse } from 'models/types';
import { getIdFromUrl, parseNumber } from '../utils';
import { getArray, getDate, getString } from 'utils/types';
import { CommonTransport, StarShip, Vehicle } from '../models/transport';

const mapToTransport = (transportResponse: JSONResponse) => {
  const id = getIdFromUrl(getString(transportResponse.url));
  const item: CommonTransport = {
    id,
    name: getString(transportResponse.name),
    model: getString(transportResponse.model),
    manufacturer: getString(transportResponse.manufacturer),
    costInCredits: parseNumber(getString(transportResponse.cost_in_credits)),
    length: parseNumber(getString(transportResponse.length)),
    maxAtmospheringSpeed: parseNumber(getString(transportResponse.max_atmosphering_speed)),
    crew: getString(transportResponse.crew),
    passengers: parseNumber(getString(transportResponse.passengers)),
    cargoCapacity: parseNumber(getString(transportResponse.cargo_capacity)),
    consumables: getString(transportResponse.consumables),
    pilots: getArray(transportResponse.pilots).map((pilot) => getIdFromUrl(getString(pilot))),
    films: getArray(transportResponse.films).map((film) => getIdFromUrl(getString(film))),
    created: getDate(getString(transportResponse.created)),
    edited: getDate(getString(transportResponse.edited)),
  };
  return { id, item };
};

export const mapToStarship = (starshipResponse: JSONResponse) => {
  const { id, item } = mapToTransport(starshipResponse);
  const starshipItem: StarShip = {
    ...item,
    hyperdriveRating: parseNumber(getString(starshipResponse.hyperdrive_rating)),
    MGLT: parseNumber(getString(starshipResponse.MGLT)),
    starshipClass: getString(starshipResponse.starship_class),
  };
  return { id, item: starshipItem };
};

export const mapToVehicle = (vehicleResponse: JSONResponse) => {
  const { id, item } = mapToTransport(vehicleResponse);
  const vehicleItem: Vehicle = {
    ...item,
    vehicleClass: getString(vehicleResponse.vehicle_class),
  };
  return { id, item: vehicleItem };
};
