import { createSelector } from 'reselect';

const selectMapsDomain = state => state.get('maps');

export const selectPlaces = createSelector(
  selectMapsDomain, state => state.get('places')
);
