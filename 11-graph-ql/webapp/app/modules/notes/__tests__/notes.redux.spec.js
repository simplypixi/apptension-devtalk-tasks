import { expect } from 'chai';
import { fromJS } from 'immutable';

import {
  reducer as notesReducer,
  NotesActions,
  NotesTypes,
} from '../notes.redux';


describe('Notes: redux', () => {
  const state = fromJS({
  });

  describe('reducer', () => {
    it('should return initial state', () => {
      expect(notesReducer(undefined, {}).toJS()).to.deep.equal(state.toJS());
    });

    it('should return state on unknown action', () => {
      expect(notesReducer(state, { type: 'unknown-action' }).toJS()).to.deep.equal(state.toJS());
    });
  });
});
