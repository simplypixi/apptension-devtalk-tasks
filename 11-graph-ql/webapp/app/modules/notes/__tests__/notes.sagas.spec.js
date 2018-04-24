import SagaTester from 'redux-saga-tester';
import { expect } from 'chai';
import { fromJS } from 'immutable';

import mockApi from '../../../utils/mockApi';
import { watchNotes } from '../notes.sagas';
import {
  NotesActions,
  NotesTypes
} from '../notes.redux';

describe('Notes: sagas', () => {
  const defaultState = fromJS({});

  const getSagaTester = (initialState = {}) => {
    const sagaTester = new SagaTester({
      initialState: defaultState.mergeDeep(initialState),
    });
    sagaTester.start(watchNotes);
    return sagaTester;
  };

  it('should implement a test', () => {
    const sagaTester = getSagaTester();

    sagaTester.dispatch(NotesActions.noop());

    expect(sagaTester.getCalledActions()).to.deep.equal([NotesActions.noop()]);
  });
});
