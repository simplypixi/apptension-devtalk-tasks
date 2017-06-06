import { combineReducers } from 'redux-immutable';

import { reducer as routerReducer } from './router/router.redux';
import { reducer as localesReducer } from './locales/locales.redux';
import { reducer as maintainersReducer } from './maintainers/maintainers.redux';
import { reducer as weatherReducer } from './weather/weather.redux';
import { reducer as mapsReducer } from './maps/maps.redux';


export default function createReducer() {
  return combineReducers({
    route: routerReducer,
    maintainers: maintainersReducer,
    weather: weatherReducer,
    locales: localesReducer,
    maps: mapsReducer,
  });
}
