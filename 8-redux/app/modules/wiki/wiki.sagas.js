import { call, put, takeLatest } from 'redux-saga/effects';
import { assign, toArray, pick } from 'lodash';
import { parseJSON } from '../api/api.sagas';
import { WikiTypes, WikiActions } from './wiki.redux';

export function* requestWikiSaga(url) {
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

export function* fetchWikiSaga({ wiki }) {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=&explaintext=&format=json&origin=*&titles=${wiki}`;
    const data = yield call(requestWikiSaga, url);
    const dataArray = toArray(data.query.pages);
    const extractedData = dataArray[0];
    yield put(WikiActions.fetchSuccess(extractedData));
  } catch (e) {
    console.log('api error', e);
    yield put(WikiActions.fetchError(e));
  }
}

export default function* WikiSaga() {
  yield [
    takeLatest(WikiTypes.FETCH, fetchWikiSaga),
  ];
}
