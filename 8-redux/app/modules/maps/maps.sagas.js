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

export function* fetchPlacesSaga({ input: {value } }) {
  try {
    const url = `http://nominatim.openstreetmap.org/search/${value}?format=json&addressdetails=1&limit=1&extratags=1`;
    const data = yield call(requestPlacesSaga, url);

    yield put(MapsActions.fetchSuccess(data));
  } catch (e) {
    console.log('api error', e);
    yield put(MapsActions.fetchError(e));
  }
}

export default function* WeatherSaga() {
  yield [
    takeLatest(MapsTypes.FETCH, fetchPlacesSaga),
  ];
}
