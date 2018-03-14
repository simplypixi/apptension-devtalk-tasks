import { all, fork } from 'redux-saga/effects';
import maintainersSaga from './maintainers/maintainers.sagas';
import currentUserSaga from './currentUser/currentUser.sagas';

//<-- IMPORT MODULE SAGA -->

export default function* rootSaga() {
  yield all([
    fork(maintainersSaga),
    fork(currentUserSaga),
    //<-- INJECT MODULE SAGA -->
  ]);
}
