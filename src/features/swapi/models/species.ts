import { Base } from './base';

export interface Species extends Base {
  name: string;
  classification: string;
  designation: string;
  averageHeight: number | null;
  skinColors: string[];
  hairColors: string[];
  eyeColors: string[];
  averageLifespan: number | null;
  homeworld: number;
  language: string;
  people: number[];
  films: number[];
}
