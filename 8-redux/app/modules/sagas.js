import maintainersSaga from './maintainers/maintainers.sagas';
import weatherSaga from './weather/weather.sagas';
import mapsSaga from './maps/maps.sagas';
import wikiSaga from './wiki/wiki.sagas';

export default function* rootSaga() {
  yield [
    maintainersSaga(),
    weatherSaga(),
    mapsSaga(),
    wikiSaga(),
  ];
}
