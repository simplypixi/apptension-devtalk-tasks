import { expect } from 'chai';
import { fromJS } from 'immutable';

import reducer from '../locales.reducer';

describe('localesReducer', () => {
  const falseAction = { type: 'type' };
  const initialState = fromJS({
    language: null,
  });

  it('should return initial value', () => {
    const resultState = reducer(undefined, falseAction);
    expect(resultState.toJS()).to.deep.equal(initialState.toJS());
  });

  it('should return given state when unhandled action is passed', () => {
    const givenState = fromJS({ language: 'de' });
    const resultState = reducer(givenState, falseAction);
    expect(resultState).to.equal(givenState);
  });
});


