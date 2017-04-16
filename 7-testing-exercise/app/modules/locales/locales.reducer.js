import { Record } from 'immutable';
import { createReducer } from 'reduxsauce';

import { localesActionsTypes } from './locales.actions';


const StateRecord = new Record({
  language: null,
});

const INITIAL_STATE = new StateRecord({});

const setLanguageHandler = (state = INITIAL_STATE, action) => state.set('language', action.payload);

const HANDLERS = {
  [localesActionsTypes.SET_LANGUAGE]: setLanguageHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);

