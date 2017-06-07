import { createActions, createReducer } from 'reduxsauce';
import { Record, Map, fromJS } from 'immutable'

export const { Types: WikiTypes, Creators: WikiActions } = createActions({
  fetch: ['wiki'],
  fetchSuccess: ['data'],
  fetchError: ['payload'],
}, { prefix: 'Wiki_' });

const WikiRecord = new Record({
  wiki: Map(),
});

export const INITIAL_STATE = new WikiRecord({});

const getSuccessHandler = (state = INITIAL_STATE, action) => state.set('wiki', fromJS(action.data));

export const reducer = createReducer(INITIAL_STATE, {
  [WikiTypes.FETCH_SUCCESS]: getSuccessHandler,
});
