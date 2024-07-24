import { Base } from './base';

export interface CommonTransport extends Base {
  name: string;
  model: string;
  manufacturer: string;
  costInCredits: number | null;
  length: number | null;
  maxAtmospheringSpeed: number | null;
  crew: string;
  passengers: number | null;
  cargoCapacity: number | null;
  consumables: string;
  pilots: number[];
  films: number[];
}

export interface StarShip extends CommonTransport {
  hyperdriveRating: number | null;
  MGLT: number | null;
  starshipClass: string;
}

export interface Vehicle extends CommonTransport {
  vehicleClass: string;
}
