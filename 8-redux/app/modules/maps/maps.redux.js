import { createActions, createReducer } from 'reduxsauce';
import { Record, List, fromJS } from 'immutable';

export const { Types: MapsTypes, Creators: MapsActions } = createActions({
  fetch: ['input'],
  fetchSuccess: ['data'],
  fetchError: ['payload'],
}, { prefix: 'MAPS_' });

const MapsRecord = new Record({
  places: List(),
});

export const INITIAL_STATE = new MapsRecord({});

const getSuccessHandler = (state = INITIAL_STATE, action) => state.set('places', fromJS(action.data));

export const reducer = createReducer(INITIAL_STATE, {
  [MapsTypes.FETCH_SUCCESS]: getSuccessHandler,
});
