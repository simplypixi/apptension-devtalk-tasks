import { all, fork } from 'redux-saga/effects';
import maintainersSaga from './maintainers/maintainers.sagas';
import { watchNotes } from './notes/notes.sagas';
//<-- IMPORT MODULE SAGA -->

export default function* rootSaga() {
  yield all([
    fork(maintainersSaga),
    fork(watchNotes),
    //<-- INJECT MODULE SAGA -->
  ]);
}
