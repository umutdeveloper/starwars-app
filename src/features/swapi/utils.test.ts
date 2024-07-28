import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createSliceFor, initialState as initialSwapiState } from './utils';
import { JSONResponse } from 'models/types';
import swapiRequestItemMiddleware from '@store/middlewares/swapiRequestItemMiddleware';

describe('createSliceFor', () => {
  const initialState = { ...initialSwapiState };
  const apiPath = 'people';
  const resultMapper = (result: JSONResponse) => ({ id: result.id as number, item: result.item });
  const { slice, fetchList: fetchListThunk, fetchItem: fetchItemThunk, fetchItems: fetchItemsThunk } = createSliceFor(apiPath, resultMapper);
  const store = configureStore({
    reducer: {
      swapi: combineReducers({
        [apiPath]: slice.reducer,
      }),
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(swapiRequestItemMiddleware),
  });

  const spyOnFetchResponse = (response: unknown) => {
    return vi.spyOn(window, 'fetch').mockImplementation(() =>
      Promise.resolve<Response>(
        new Response(JSON.stringify(response), {
          status: 200,
          statusText: 'Ok',
          headers: { 'Content-Type': 'application/json' },
        })
      )
    );
  };

  const spyOnFetchError = (error: unknown) => {
    return vi.spyOn(window, 'fetch').mockImplementation(() => Promise.reject<Response>(error));
  };

  it('should handle nextPage action', () => {
    store.dispatch(slice.actions.nextPage());
    const state = store.getState().swapi[apiPath];
    expect(state.hasNext).toBe(false);
    expect(state.pagination.page).toBe(1);
  });

  it('should handle prevPage action', () => {
    store.dispatch(slice.actions.prevPage());
    const state = store.getState().swapi[apiPath];
    expect(state.hasPrev).toBe(false);
    expect(state.pagination.page).toBe(1);
  });

  it('should handle search action', () => {
    store.dispatch(slice.actions.search('test search'));
    const state = store.getState().swapi[apiPath];
    expect(state.pagination.search).toBe('test search');
    expect(state.pagination.page).toBe(1);
  });

  it('should handle reset action', () => {
    store.dispatch(slice.actions.reset());
    const state = store.getState().swapi[apiPath];
    expect(state.error).toEqual(null);
    expect(state.count).toEqual(initialState.count);
    expect(state.hasNext).toEqual(initialState.hasNext);
    expect(state.pageResults).toEqual(initialState.pageResults);
    expect(state.pagination.page).toEqual(initialState.pagination.page);
    expect(state.pagination.search).toEqual(initialState.pagination.search);
  });

  it('should handle requestItem action', () => {
    store.dispatch(slice.actions.requestItem(1));
    const state = store.getState().swapi[apiPath];
    expect(state.requestedList).toContain(1);
  });

  it('should handle clearRequestList action', () => {
    store.dispatch(slice.actions.clearRequestList());
    const state = store.getState().swapi[apiPath];
    expect(state.requestedList).toHaveLength(0);
  });

  it('should handle fetchListThunk.pending', async () => {
    const fetchSpy = spyOnFetchResponse({});
    store.dispatch(fetchListThunk({ page: 1, search: '' }));
    fetchSpy.mockRestore();

    const state = store.getState().swapi[apiPath];
    expect(state.status).toEqual('loading');
  });

  it('should handle fetchListThunk.fulfilled', async () => {
    const mockResponse = { count: 20, results: [{ id: 1, item: 'testItem 1' }], next: 'idURL', previous: 'idURL2' };
    const fetchSpy = spyOnFetchResponse(mockResponse);
    await store.dispatch(fetchListThunk({ page: 1, search: '' }));
    fetchSpy.mockRestore();

    const state = store.getState().swapi[apiPath];

    expect(state.count).toEqual(20);
    expect(state.pageResults).toHaveLength(1);
    expect(state.results[1]).toEqual('testItem 1');
    expect(state.status).toEqual('succeeded');
    expect(state.hasNext).toEqual(true);
    expect(state.hasPrev).toEqual(true);
  });

  it('should change page with nextPage action', () => {
    store.dispatch(slice.actions.nextPage());
    const state = store.getState().swapi[apiPath];
    expect(state.pagination.page).toBe(2);
  });

  it('should change page with prevPage action', () => {
    store.dispatch(slice.actions.prevPage());
    const state = store.getState().swapi[apiPath];
    expect(state.pagination.page).toBe(1);
  });

  it('should handle fetchListThunk.rejected', async () => {
    const error = new Error('Failed to fetch list');
    const fetchSpy = spyOnFetchError(error);
    await store.dispatch(fetchListThunk({ page: 1, search: '' }));
    fetchSpy.mockRestore();

    const state = store.getState().swapi[apiPath];

    expect(state.error).toEqual('Failed to fetch list');
    expect(state.status).toEqual('failed');
  });

  it('should handle fetchItemThunk.pending', async () => {
    const fetchSpy = spyOnFetchResponse({});
    store.dispatch(fetchItemThunk(1));
    fetchSpy.mockRestore();
    
    const state = store.getState().swapi[apiPath];
    expect(state.itemStatus).toEqual('loading');
  });

  it('should handle fetchItemThunk.fulfilled', async () => {
    const mockResponse = { id: 1, item: 'testItem 11' };
    const fetchSpy = spyOnFetchResponse(mockResponse);
    await store.dispatch(fetchItemThunk(1));
    fetchSpy.mockRestore();

    const state = store.getState().swapi[apiPath];

    expect(state.results[1]).toEqual('testItem 11');
    expect(state.itemStatus).toEqual('succeeded');
  });

  it('should handle fetchItemThunk.rejected', async () => {
    const error = new Error('Failed to fetch item');
    const fetchSpy = spyOnFetchError(error);
    await store.dispatch(fetchItemThunk(1));
    fetchSpy.mockRestore();

    const state = store.getState().swapi[apiPath];

    expect(state.error).toEqual('Failed to fetch item');
    expect(state.itemStatus).toEqual('failed');
  });

  it('should handle fetchItemsThunk.pending', async () => {
    const fetchSpy = spyOnFetchResponse({});
    store.dispatch(fetchItemsThunk([1]));
    fetchSpy.mockRestore();
    
    const state = store.getState().swapi[apiPath];
    expect(state.itemStatus).toEqual('loading');
  });

  it('should handle fetchItemsThunk.fulfilled', async () => {
    const mockResponse = { id: 1, item: 'testItem 111' };
    const fetchSpy = spyOnFetchResponse(mockResponse);
    await store.dispatch(fetchItemsThunk([1]));
    fetchSpy.mockRestore();

    const state = store.getState().swapi[apiPath];

    expect(state.results[1]).toEqual('testItem 111');
    expect(state.itemStatus).toEqual('succeeded');
  });

  it('should handle fetchItemsThunk.rejected', async () => {
    const error = new Error('Failed to fetch items');
    const fetchSpy = spyOnFetchError(error);
    await store.dispatch(fetchItemsThunk([1]));
    fetchSpy.mockRestore();

    const state = store.getState().swapi[apiPath];

    expect(state.error).toEqual('Failed to fetch items');
    expect(state.itemStatus).toEqual('failed');
  });
});
