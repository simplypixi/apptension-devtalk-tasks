import maintainersSaga from './maintainers/maintainers.sagas';
import weatherSaga from './weather/weather.sagas';
import mapsSaga from './maps/maps.sagas';

export default function* rootSaga() {
  yield [
    maintainersSaga(),
    weatherSaga(),
    mapsSaga(),
  ];
}
