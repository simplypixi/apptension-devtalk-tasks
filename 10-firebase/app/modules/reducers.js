import { combineReducers } from 'redux-immutable';

import { reducer as routerReducer } from './router/router.redux';
import { reducer as localesReducer } from './locales/locales.redux';
import { reducer as maintainersReducer } from './maintainers/maintainers.redux';
import { reducer as messagesReducer } from './messages/messages.redux';
import { reducer as usersReducer } from './users/users.redux';
import { reducer as currentUserReducer } from './currentUser/currentUser.redux';
//<-- IMPORT MODULE REDUCER -->

export default function createReducer() {
  return combineReducers({
    route: routerReducer,
    maintainers: maintainersReducer,
    locales: localesReducer,
    messages: messagesReducer,
    users: usersReducer,
    currentUser: currentUserReducer,
    //<-- INJECT MODULE REDUCER -->
  });
}
