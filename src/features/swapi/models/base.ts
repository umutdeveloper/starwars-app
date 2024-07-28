import { APIStatus, JSONResponse } from 'models/types';

export interface SwapiListJSONResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<JSONResponse>;
}

export interface SwapiState<T> {
  count: number;
  pagination: {
    page: number;
    search: string;
    pageSize: number;
  };
  hasNext: boolean | null;
  hasPrev: boolean | null;
  results: { [key: number]: T };
  pageResults: Array<number>;
  requestedList: Array<number>;
  status: APIStatus;
  error: string | null;
}

export interface Base {
  id: number;
  created: string;
  edited: string;
}
