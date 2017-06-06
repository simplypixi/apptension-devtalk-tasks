import { call, put, takeLatest } from 'redux-saga/effects';
import { assign } from 'lodash';
import { parseJSON } from '../api/api.sagas';
import { MapsTypes, MapsActions } from './maps.redux';

export function* requestPlacesSaga(url) {
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

export function* fetchPlacesSaga({ weather = 'New York' }) {
  try {
    const appid = '01e9c2222acd8930d8bf2c5629971c23';
    const place = weather;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${appid}&units=metric`;
    const data = yield call(requestWeatherSaga, url);

    yield put(MapsActions.fetchSuccess(data));
  } catch (e) {
    yield put(MapsActions.fetchError(e));
  }
}

export default function* WeatherSaga() {
  yield [
    takeLatest(MapsTypes.FETCH, fetchPlacesSaga),
  ];
}
