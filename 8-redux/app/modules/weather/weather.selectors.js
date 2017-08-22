import { createSelector } from 'reselect';

const selectWeathersDomain = state => state.get('weather');

export const selectWeathersItem = createSelector(
  selectWeathersDomain, state => state.get('weather')
);
