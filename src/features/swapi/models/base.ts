import { APIStatus, JSONResponse } from 'models/types';

export interface SwapiListJSONResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<JSONResponse>;
}

export interface SwapiState<T> {
  count: number;
  page: number;
  search: string;
  hasNext: boolean | null;
  hasPrev: boolean | null;
  results: { [key: number]: T };
  pageResults: Array<number>;
  status: APIStatus;
  error: string | null;
}

export interface Base {
  id: number;
  created: Date;
  edited: Date;
}
