import { expect } from 'chai';
import { fromJS, List } from 'immutable';

import reducer from '../teams.reducer';

describe('teams reducer', () => {
  const falseAction = { type: 'type' };
  const initialState = fromJS({
    list: List(),
    rangeValues: fromJS({
      min: 0,
      max: 600,
    }),
    error: null,
  });
  it('should return initial value', () => {
    const resultState = reducer(undefined, falseAction);
    expect(resultState.toJS()).to.deep.equal(initialState.toJS());
  });
});
