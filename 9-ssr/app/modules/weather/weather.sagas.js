import { call, put, takeLatest } from 'redux-saga/effects';
import { assign } from 'lodash';
import { parseJSON } from '../api/api.sagas';
import { WeatherTypes, WeatherActions } from './weather.redux';

export function* requestWeatherSaga(url) {
  const headers = assign({
    'Content-Type': 'application/json',
    method: 'GET',
  });

  try {
    const response = yield call(fetch, url, headers);
    return yield call(parseJSON, response);
  } catch (e) {
    return yield call(parseJSON, e);
  }
}

export function* fetchWeatherSaga({ weather: { value, lang } }) {
  try {
    const appid = '01e9c2222acd8930d8bf2c5629971c23';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${appid}&units=metric&lang=${lang}`;
    const data = yield call(requestWeatherSaga, url);

    yield put(WeatherActions.fetchSuccess(data));
  } catch (e) {
    yield put(WeatherActions.fetchError(e));
  }
}

export default function* WeatherSaga() {
  yield [
    takeLatest(WeatherTypes.FETCH, fetchWeatherSaga),
  ];
}
