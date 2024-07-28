import configureMockStore from 'redux-mock-store';
import { UnknownAction } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import swapiRequestItemMiddleware from '@store/middlewares/swapiRequestItemMiddleware';

const middlewares = [thunk, swapiRequestItemMiddleware];
const mockStoreWith = <T>() => configureMockStore<T, UnknownAction>(middlewares as never);
const mockStore = <T>(state: T) => mockStoreWith<T>()(state);

export default mockStore;
