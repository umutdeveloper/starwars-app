// TODO: It was added as a temp solution due to a current TS error
// Issue Link: https://github.com/reduxjs/redux-toolkit/issues/3962#issuecomment-2211975383
import { AsyncThunkConfig } from './../../../node_modules/@reduxjs/toolkit/dist/createAsyncThunk.d';
import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Base, SwapiListJSONResponse, SwapiState } from './models/base';
import { APIStatus, JSONResponse } from 'models/types';
import { mapToState } from './mappers/listMapper';
import { getString } from 'utils/types';
import { WritableDraft, Draft } from 'immer';
import { SwapiListPageProps } from 'hocs/withSwapiListPage';
import { RootState } from '@store/index';

const BASE_SWAPI_URL = import.meta.env.VITE_BASE_SWAPI_URL;

export const getIdFromUrl = (url: string) => {
  const idText = url.split('/').filter(Boolean).pop();
  if (idText) {
    return parseInt(idText);
  }
  return 0;
};

export const parseNumber = (number: string) => {
  const num = parseFloat(getString(number).replace(/,/g, ''));
  return num || null;
};

const fetchList = (name: string, apiPath: string) =>
  createAsyncThunk<SwapiListJSONResponse, { page: number; search: string }, AsyncThunkConfig>(name, async ({ page, search }) => {
    const response = await fetch(`${BASE_SWAPI_URL}${apiPath}/?page=${page}&search=${search}`);
    const data = await response.json();
    return data;
  });

const fetchItem = (name: string, apiPath: string) =>
  createAsyncThunk<JSONResponse, number, AsyncThunkConfig>(name, async (id) => {
    const response = await fetch(`${BASE_SWAPI_URL}${apiPath}/${id}`);
    const data = await response.json();
    return data;
  });

const fetchItems = (name: string, apiPath: string) =>
  createAsyncThunk<JSONResponse[], number[], AsyncThunkConfig>(name, async (ids) => {
    const dataList = await Promise.all(ids.map(async (id) => (await fetch(`${BASE_SWAPI_URL}${apiPath}/${id}`)).json()));
    return dataList;
  });

const statusHandler =
  <K, T extends 'status' | 'itemStatus'>(type: T, status: APIStatus, err?: string) =>
  (state: WritableDraft<SwapiState<K>>) => {
    state[type] = status;
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

export const initialState = {
  count: 0,
  pagination: {
    search: '',
    page: 1,
    pageSize: 10,
  },
  hasNext: false,
  hasPrev: false,
  results: {},
  pageResults: [],
  requestedList: [],
  status: 'idle',
  itemStatus: 'idle',
  error: null,
};

export const createSliceFor = <T>(apiPath: string, resultMapper: (result: JSONResponse) => { id: number; item: T }) => {
  const fetchListThunk = fetchList(`swapi/fetchList/${apiPath}`, apiPath);
  const fetchItemThunk = fetchItem(`swapi/fetchItem/${apiPath}`, apiPath);
  const fetchItemsThunk = fetchItems(`swapi/fetchItems/${apiPath}`, apiPath);
  const initialModelState = { ...initialState } as SwapiState<T>;
  const slice = createSlice({
    name: apiPath,
    initialState: initialModelState,
    reducers: {
      nextPage: (state) => {
        if (state.hasNext && state.status !== 'loading') {
          state.pagination = { ...state.pagination, page: state.pagination.page + 1 };
        }
      },
      prevPage: (state) => {
        if (state.hasPrev && state.status !== 'loading') {
          state.pagination = { ...state.pagination, page: state.pagination.page - 1 };
        }
      },
      search: (state, action: PayloadAction<string>) => {
        if (state.status !== 'loading') {
          state.pagination = { ...state.pagination, page: 1, search: action.payload };
        }
      },
      requestItem: (state, action: PayloadAction<number>) => {
        if (!state.requestedList.includes(action.payload) && !state.results[action.payload]) {
          state.requestedList.push(action.payload);
        }
      },
      reset: (state) => {
        state.error = null;
        state.count = initialModelState.count;
        state.pagination = { ...state.pagination, ...initialModelState.pagination };
        state.hasNext = initialModelState.hasNext;
        state.hasPrev = initialModelState.hasPrev;
        state.pageResults = initialModelState.pageResults;
        state.status = initialModelState.status;
      },
      clearRequestList: (state) => {
        state.requestedList = [];
        state.itemStatus = initialModelState.itemStatus;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchListThunk.pending, statusHandler('status', 'loading'))
        .addCase(fetchItemThunk.pending, statusHandler('itemStatus', 'loading'))
        .addCase(fetchItemsThunk.pending, statusHandler('itemStatus', 'loading'))
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
            state.error = null;
            state.itemStatus = 'succeeded';
            state.results[id] = item as Draft<T>;
            const index = state.requestedList.indexOf(id);
            if (index !== -1) {
              state.requestedList.splice(index, 1);
            }
          });
        })
        .addCase(fetchItemsThunk.fulfilled, (state, action) => {
          withErrorHandler(state, () => {
            const list = action.payload;
            state.error = null;
            state.itemStatus = 'succeeded';
            list.forEach((itemResponse) => {
              const { id, item } = resultMapper(itemResponse);
              state.results[id] = item as Draft<T>;
              const index = state.requestedList.indexOf(id);
              if (index !== -1) {
                state.requestedList.splice(index, 1);
              }
            });
          });
        })
        .addCase(fetchListThunk.rejected, (state, action) => statusHandler('status', 'failed', action.error.message)(state))
        .addCase(fetchItemThunk.rejected, (state, action) => statusHandler('itemStatus', 'failed', action.error.message)(state))
        .addCase(fetchItemsThunk.rejected, (state, action) => statusHandler('itemStatus', 'failed', action.error.message)(state));
    },
  });

  return { slice, fetchList: fetchListThunk, fetchItem: fetchItemThunk, fetchItems: fetchItemsThunk };
};

export const createSwapiListMapToStateProps = <T extends Base>(selector: (state: RootState) => SwapiState<T>) => {
  const selectResults = (state: SwapiState<T>) => state.results;
  const selectPageResults = (state: SwapiState<T>) => state.pageResults;
  const selectPageItemResults = createSelector([selectResults, selectPageResults], (results, pageResults) => {
    return pageResults.map((resultId) => results[resultId]);
  });
  const mapStateToProps = (state: RootState) => {
    const listState = selector(state);
    return {
      pageResults: selectPageItemResults(listState),
      hasPrev: listState.hasPrev,
      hasNext: listState.hasNext,
      count: listState.count,
      pagination: listState.pagination,
      status: listState.status,
      error: listState.error,
    } as SwapiListPageProps<T>;
  };

  return mapStateToProps;
};
