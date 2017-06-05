import { combineReducers } from 'redux-immutable';

import routerReducer from './router/router.reducer';
import localesReducer from './locales/locales.reducer';
import teamsReducer from './teams/teams.reducer';


export default function createReducer() {
  return combineReducers({
    route: routerReducer,
    teams: teamsReducer,
    locales: localesReducer,
  });
}
