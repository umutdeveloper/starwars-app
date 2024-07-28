import { Base, SwapiState } from '@features/swapi/models/base';
import { Dispatch, Middleware, UnknownAction } from '@reduxjs/toolkit';
import * as slices from '@features/swapi/swapiSlices';
import type { SliceDetails } from '@features/swapi/swapiSlices';

const isFulfilledAction = (action: unknown): action is { type: string } => {
  return typeof action === 'object' && action !== null && 'type' in action && (action as { type: string }).type.endsWith('fulfilled');
};

const isRequestItemAction = (action: unknown): action is { type: string } => {
  return typeof action === 'object' && action !== null && 'type' in action && (action as { type: string }).type.endsWith('requestItem');
};

const swapiRequestItemMiddleware: Middleware<Record<string, never>, { swapi: { [key: string]: SwapiState<unknown> } }, Dispatch<UnknownAction>> =
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    const result = next(action);

    if (isRequestItemAction(action) || isFulfilledAction(action)) {
      const actionParts = action.type.split('/');
      const sliceName = actionParts[actionParts.length - 2];
      const state = getState();
      if (state.swapi[sliceName].itemStatus !== 'loading' && state.swapi[sliceName].requestedList.length > 0) {
        const slicesObj = slices as unknown as { [key: string]: SliceDetails<Base> };
        const requestedBatch = state.swapi[sliceName].requestedList.slice(0, 5);
        const dispatchAction = slicesObj[sliceName].fetchItems(requestedBatch) as unknown as UnknownAction;
        dispatch(dispatchAction);
      }
    }

    return result;
  };

export default swapiRequestItemMiddleware;
