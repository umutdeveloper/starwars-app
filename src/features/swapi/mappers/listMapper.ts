import { JSONResponse } from 'models/types';
import { SwapiListJSONResponse, SwapiState } from '../models/base';
import { getArrayFor, getNumber } from 'utils/types';

export const mapToState = <T>(
  response: SwapiListJSONResponse,
  resultMapper: (result: JSONResponse) => { id: number; item: T }
) => {
  const state: Pick<SwapiState<T>, 'count' | 'hasNext' | 'hasPrev' | 'results' | 'pageResults'> = {
    count: getNumber(response.count),
    hasNext: response.next !== null,
    hasPrev: response.previous !== null,
    ...getArrayFor<JSONResponse>(response.results).reduce(
      (acc: { results: { [key: number]: T }; pageResults: number[] }, curr) => {
        const { id, item } = resultMapper(curr);
        acc.results[id] = item;
        acc.pageResults.push(id);
        return acc;
      },
      { results: {}, pageResults: [] }
    ),
  };
  return state;
};
