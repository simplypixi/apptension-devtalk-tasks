import { createActions, createReducer } from 'reduxsauce';
import { Record, List, fromJS, Map } from 'immutable';
import { uniqueId } from 'lodash';

export const { Types: NotesTypes, Creators: NotesActions } = createActions({
  setSelectedNote: ['note'],
  removeSelectedNote: [],
  createNewNote: [],
  updateNoteDescription: ['description']
}, { prefix: 'NOTES_' });

const NotesRecord = new Record({
  items: List(),
  selectedNote: Map()
});

export const INITIAL_STATE = new NotesRecord(fromJS({
  //Mock
  items: [{
    id: uniqueId(),
    description: 'Testowa notka - wykonana',
    date: '2018-04-20',
    isDone: true,
  }, {
    id: uniqueId(),
    description: 'Test',
    date: '2018-05-02',
    isDone: false,
  }, {
    id: uniqueId(),
    description: 'Test',
    date: '2018-05-03',
    isDone: false,
  }]
}));

const createNewNote = (state = INITIAL_STATE) => {
  const newNote = Map({
    id: '-1',
    isNew: true,
    description: '',
    date: (new Date).toISOString().slice(0, 10),
    isDone: false
  });

  const stateWithSelectedNew = setSelectedNote(state, {note: newNote});
  return stateWithSelectedNew.update('items', (items) => items.unshift(newNote));
};


const setSelectedNote = (state = INITIAL_STATE, {note}) => {
  return state.set('selectedNote', note);
};

const removeSelectedNote = (state = INITIAL_STATE) => {
  const noteToRemoveId = state.getIn(['selectedNote', 'id']);
  const updatedNotes = state.items.filter((note) => {
    return note.get('id') !== noteToRemoveId;
  });

  if (state.getIn(['selectedNote', 'id']) === noteToRemoveId) {
    setSelectedNote(state, {note: Map()});
  }
  return state.set('items', updatedNotes);
};

const updateNoteDescription = (state = INITIAL_STATE, {description}) => {
  let updatedNote = state.get('selectedNote').set('description', description);

  if (state.getIn(['selectedNote', 'isNew'])) {
    updatedNote = updatedNote.delete('isNew').set('id', uniqueId());
  }

  const updatedNoteIndex = state.get('items').findIndex((item) => { 
    return item.get('id') === state.getIn(['selectedNote', 'id']); 
  });
  
  const withUpdatedNote = state.updateIn(['items', updatedNoteIndex], (item) => {
    return updatedNote;
  });

  return setSelectedNote(withUpdatedNote, {note: updatedNote});
};

export const reducer = createReducer(INITIAL_STATE, {
  [NotesTypes.SET_SELECTED_NOTE]: setSelectedNote,
  [NotesTypes.REMOVE_SELECTED_NOTE]: removeSelectedNote,
  [NotesTypes.CREATE_NEW_NOTE]: createNewNote,
  [NotesTypes.UPDATE_NOTE_DESCRIPTION]: updateNoteDescription,

});
