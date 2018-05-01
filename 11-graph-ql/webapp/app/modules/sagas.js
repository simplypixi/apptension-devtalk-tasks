import { all, fork } from 'redux-saga/effects';
import maintainersSaga from './maintainers/maintainers.sagas';
import notesSaga from './notes/notes.sagas';
//<-- IMPORT MODULE SAGA -->

export default function* rootSaga() {
  yield all([
    fork(maintainersSaga),
    fork(notesSaga),
    //<-- INJECT MODULE SAGA -->
  ]);
}
