import { createActions, createReducer } from 'reduxsauce';
import { Record, Map, fromJS } from 'immutable';

export const { Types: CurrentUserTypes, Creators: CurrentUserActions } = createActions({
  signIn: [],
  signInSuccess: ['user'],
  signInError: [],
}, { prefix: 'CURRENT_USER_' });

const CurrentUserRecord = new Record({
  currentUser: Map({
    isSigned: false,
  }),
});

export const INITIAL_STATE = new CurrentUserRecord({});

const signInSuccess = (state = INITIAL_STATE, action) => {
  return state.set('currentUser', fromJS({ ...action.user, isSigned: true }));
};

const signInError = (state = INITIAL_STATE) => {
  return state.set('currentUser', fromJS({ isSigned: false }));
};

export const reducer = createReducer(INITIAL_STATE, {
  [CurrentUserTypes.SIGN_IN_SUCCESS]: signInSuccess,
  [CurrentUserTypes.SIGN_IN_ERROR]: signInError,
});
