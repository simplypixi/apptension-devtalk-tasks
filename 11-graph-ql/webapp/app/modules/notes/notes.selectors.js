import { set } from 'immutable';
import { createSelector } from 'reselect';

const getNoteTitle = (description = '') => {
  return description.split('\n')[0] || 'Bez tytułu';
};

const selectNotesDomain = state => state.get('notes');

export const selectNotesItems = createSelector(
  selectNotesDomain, state => {
    const notes = state.get('items');
    return notes.map((note) => {
      return note.set('title', getNoteTitle(note.get('description')));
    });
  }
);

export const selectSelectedNote = createSelector(
  selectNotesDomain, state => state.get('selectedNote')
);
