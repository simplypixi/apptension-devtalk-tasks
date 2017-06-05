import { createActions, createReducer } from 'reduxsauce';
import { Record, Map, fromJS } from 'immutable';

export const { Types: WeatherTypes, Creators: WeatherActions } = createActions({
  fetch: ['weather'],
  fetchSuccess: ['data'],
  fetchError: ['payload'],
}, { prefix: 'Weather_' });

const WeatherRecord = new Record({
  weather: Map(),
});

export const INITIAL_STATE = new WeatherRecord({});

const getSuccessHandler = (state = INITIAL_STATE, action) => state.set('weather', fromJS(action.data));

export const reducer = createReducer(INITIAL_STATE, {
  [WeatherTypes.FETCH_SUCCESS]: getSuccessHandler,
});
