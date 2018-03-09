import { createActions, createReducer } from 'reduxsauce';
import { Record, Map, fromJS } from 'immutable';

export const { Types: UsersTypes, Creators: UsersActions } = createActions({
  updated: ['users'],
}, { prefix: 'USERS_' });

const UsersRecord = new Record({
  users: Map(),
});

export const INITIAL_STATE = new UsersRecord({});

const updateHandler = (state = INITIAL_STATE, action) => state.set('users', fromJS(action.users));

export const reducer = createReducer(INITIAL_STATE, {
  [UsersTypes.UPDATED]: updateHandler,
});
