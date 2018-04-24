import { createSelector } from 'reselect';

export const selectNotesDomain = state => state.get('notes');
