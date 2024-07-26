// TODO: It was added as a temp solution due to a current TS error
// Issue Link: https://github.com/reduxjs/redux-toolkit/issues/3962#issuecomment-2211975383
import { AsyncThunkConfig } from './../../../node_modules/@reduxjs/toolkit/dist/createAsyncThunk.d';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SwapiListJSONResponse, SwapiState } from './models/base';
import { APIStatus, JSONResponse } from 'models/types';
import { mapToState } from './mappers/listMapper';
import { getString } from 'utils/types';
import { WritableDraft, Draft } from 'immer';

const BASE_SWAPI_URL = import.meta.env.VITE_BASE_SWAPI_URL;

export const getIdFromUrl = (url: string) => {
  const idText = url.split('/').filter(Boolean).pop();
  if (idText) {
    return parseInt(idText);
  }
  throw new Error(`The URL is not in expected format: ${url}`);
};

export const parseNumber = (number: string) => {
  const num = parseFloat(getString(number).replace(/,/g, ''));
  return num || null;
};

const fetchList = (name: string, apiPath: string) =>
  createAsyncThunk<SwapiListJSONResponse, { page: number; search: string }, AsyncThunkConfig>(
    name,
    async ({ page, search }) => {
      const response = await fetch(`${BASE_SWAPI_URL}${apiPath}/?page=${page}&search=${search}`);
      const data = await response.json();
      return data;
    }
  );

const fetchItem = (name: string, apiPath: string) =>
  createAsyncThunk<JSONResponse, number, AsyncThunkConfig>(name, async (id) => {
    const response = await fetch(`${BASE_SWAPI_URL}${apiPath}/${id}`);
    const data = await response.json();
    return data;
  });

const statusHandler =
  <T>(status: APIStatus, err?: string) =>
  (state: WritableDraft<SwapiState<T>>) => {
    state.status = status;
    if (err) {
      state.error = err || 'Failed to fetch data';
    }
  };

const withErrorHandler = <T>(state: WritableDraft<SwapiState<T>>, actionHandler: () => void) => {
  try {
    actionHandler();
  } catch (err: unknown) {
    if (err instanceof Error) {
      state.error = `JSON Format Error: ${err.message}`;
    } else {
      state.error = `Unexpected Error: ${err}`;
    }
  }
};

export const createSliceFor = <T>(apiPath: string, resultMapper: (result: JSONResponse) => { id: number; item: T }) => {
  const fetchListThunk = fetchList(`swapi/fetchList/${apiPath}`, apiPath);
  const fetchItemThunk = fetchItem(`swapi/fetchItem/${apiPath}`, apiPath);
  const initialState: SwapiState<T> = {
    count: 0,
    page: 1,
    search: '',
    hasNext: false,
    hasPrev: false,
    results: {},
    pageResults: [],
    status: 'idle',
    error: null,
  };
  const slice = createSlice({
    name: apiPath,
    initialState,
    reducers: {
      nextPage: (state) => {
        if (state.hasNext && state.status === 'idle') {
          state.page += 1;
        }
      },
      prevPage: (state) => {
        if (state.hasPrev && state.status === 'idle') {
          state.page -= 1;
        }
      },
      search: (state, action: PayloadAction<string>) => {
        if (state.status === 'idle') {
          state.search = action.payload;
        }
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchListThunk.pending, statusHandler('loading'))
        .addCase(fetchItemThunk.pending, statusHandler('loading'))
        .addCase(fetchListThunk.fulfilled, (state, action) => {
          withErrorHandler(state, () => {
            const { count, hasNext, hasPrev, results, pageResults } = mapToState(action.payload, resultMapper);
            state.error = null;
            state.status = 'succeeded';
            state.count = count;
            state.hasNext = hasNext;
            state.hasPrev = hasPrev;
            state.results = { ...state.results, ...(results as WritableDraft<T>) };
            state.pageResults = pageResults;
          });
        })
        .addCase(fetchItemThunk.fulfilled, (state, action) => {
          withErrorHandler(state, () => {
            const { id, item } = resultMapper(action.payload);
            state.results[id] = item as Draft<T>;
          });
        })
        .addCase(fetchListThunk.rejected, (state, action) => statusHandler('failed', action.error.message)(state))
        .addCase(fetchItemThunk.rejected, (state, action) => statusHandler('failed', action.error.message)(state));
    },
  });

  return { slice, fetchList: fetchListThunk, fetchItem: fetchItemThunk };
};
