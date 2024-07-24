import { Base } from './base';

export interface Planet extends Base {
  name: string;
  rotationPeriod: number | null;
  orbitalPeriod: number | null;
  diameter: number | null;
  climate: string;
  gravity: string;
  terrain: string;
  surfaceWater: number | null;
  population: number | null;
  residents: number[];
  films: number[];
}
