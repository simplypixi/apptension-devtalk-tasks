import { fromJS, Record, List } from 'immutable';
import { createReducer } from 'reduxsauce';

import { teamsActionsTypes } from './teams.actions';

const StateRecord = new Record({
  list: List(),
  rangeValues: fromJS({
    min: 0,
    max: 600,
  }),
  error: null,
});

const INITIAL_STATE = new StateRecord();

const teamsSuccess = (state = INITIAL_STATE, action) => state.set('list', fromJS(action.payload.teams));
const teamsError = (state = INITIAL_STATE, action) => state.set('error', action.payload.error);
const rangeValuesSuccess = (state = INITIAL_STATE, action) => state.set('rangeValues', fromJS(action.values));

const HANDLERS = {
  [teamsActionsTypes.GET_TEAMS_SUCCESS]: teamsSuccess,
  [teamsActionsTypes.SET_RANGE_VALUES]: rangeValuesSuccess,
  [teamsActionsTypes.GET_TEAMS_ERORR]: teamsError,
};

export default createReducer(INITIAL_STATE, HANDLERS);
