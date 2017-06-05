import maintainersSaga from './maintainers/maintainers.sagas';
import weatherSaga from './weather/weather.sagas';

export default function* rootSaga() {
  yield [
    maintainersSaga(),
    weatherSaga()
  ];
}
