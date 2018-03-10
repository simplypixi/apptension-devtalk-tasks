import { createSelector } from 'reselect';

const selectCurrentUserDomain = state => state.get('currentUser');

export const selectCurrentUser = createSelector(
  selectCurrentUserDomain, selectCurrentUserDomain
);
