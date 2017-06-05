import { expect } from 'chai';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import reducer from '../router.reducer';

describe('reducer', () => {
  const initialState = fromJS({
    locationBeforeTransitions: null,
  });

  it('should return initial state when no state is passed', () => {
    expect(reducer(undefined, {}).toJS()).to.deep.equal(initialState.toJS());
  });

  it('should return initial state when action is undefined', () => {
    expect(reducer(initialState, undefined).toJS()).to.deep.equal(initialState.toJS());
  });

  it('should add payload to state on LOCATION_CHANGE action', () => {
    const payload = 'payload content';
    const expectedState = fromJS({
      locationBeforeTransitions: payload,
    });
    const action = { payload, type: LOCATION_CHANGE };
    expect(reducer(initialState, action).toJS()).to.deep.equal(expectedState.toJS());
  });
});
