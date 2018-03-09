import { createSelector } from 'reselect';

const selectMessagesDomain = state => state.get('messages');

export const selectMessages = createSelector(
  selectMessagesDomain, state => state.get('messages')
);
