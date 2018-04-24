import { createActions, createReducer } from 'reduxsauce';
import { Record } from 'immutable';

export const { Types: NotesTypes, Creators: NotesActions } = createActions({
  noop: null, // TODO: remove this action
}, { prefix: 'NOTES_' });

const NotesRecord = new Record({
});

export const INITIAL_STATE = new NotesRecord({});

export const reducer = createReducer(INITIAL_STATE, {
});
