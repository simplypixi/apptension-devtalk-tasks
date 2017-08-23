import { call, put, takeLatest } from 'redux-saga/effects';
import { assign, toArray, some } from 'lodash';
import { parseJSON } from '../api/api.sagas';
import { WikiTypes, WikiActions } from './wiki.redux';

let cacheArray = [];

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

export function* fetchWikiSaga({ wiki: { value, lang } }) {
  try {
    if (cacheArray.length > 100) {
      cacheArray = [];
    }
    if (cacheArray.length > 0 && some(cacheArray, { title: value })) {
      const cachedValue = cacheArray.find((val) => val.title === value);
      yield put(WikiActions.fetchSuccess(cachedValue));
    } else {
      const url = `https://${lang}.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=&explaintext=&format=json&origin=*&titles=${value}`;
      const data = yield call(requestWikiSaga, url);
      const dataArray = toArray(data.query.pages);
      const extractedData = dataArray[0];
      if (extractedData.pageid && extractedData.extract !== '' && !some(cacheArray, extractedData)) {
        cacheArray.push(extractedData);
      }
      yield put(WikiActions.fetchSuccess(extractedData));
    }

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
