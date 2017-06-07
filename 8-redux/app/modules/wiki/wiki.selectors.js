import { createSelector } from 'reselect';

const selectWikiDomain = state => state.get('wiki');

export const selectWikiItem = createSelector(
  selectWikiDomain, state => state.get('wiki')
);
