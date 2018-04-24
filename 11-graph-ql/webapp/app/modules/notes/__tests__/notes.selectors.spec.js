import { expect } from 'chai';
import { fromJS } from 'immutable';

import { selectNotesDomain } from '../notes.selectors';

describe('Notes: selectors', () => {
  const state = fromJS({
    notes: {

    },
  });

  describe('selectNotesDomain', () => {
    it('should select a domain', () => {
      expect(selectNotesDomain(state)).to.equal(state.get('notes'));
    });
  });
});
