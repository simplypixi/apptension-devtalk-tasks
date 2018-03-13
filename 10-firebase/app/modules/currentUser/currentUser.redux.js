import { createActions, createReducer } from 'reduxsauce';
import { Record, Map, fromJS } from 'immutable';

export const { Types: CurrentUserTypes, Creators: CurrentUserActions } = createActions({
  signIn: ['user'],
}, { prefix: 'CURRENT_USER_' });

const CurrentUserRecord = new Record({
  currentUser: Map({
    isSigned: false,
  }),
});

export const INITIAL_STATE = new CurrentUserRecord({});

const signInHandler = (state = INITIAL_STATE, action) => {
  return state.set('currentUser', fromJS({ ...action.user, isSigned: true }));
};

export const reducer = createReducer(INITIAL_STATE, {
  [CurrentUserTypes.SIGN_IN]: signInHandler,
});
