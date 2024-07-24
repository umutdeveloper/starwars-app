import { configureStore } from '@reduxjs/toolkit';

import swapiReducer from '@features/swapi/swapiReducer';

const store = configureStore({
  reducer: {
    swapi: swapiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
