import { put, takeLatest } from 'redux-saga/effects';
import reportError from 'report-error';
import firebase from 'firebase';

import { CurrentUserTypes, CurrentUserActions } from './currentUser.redux';

const { auth } = firebase;
const facebookProvider = new auth.FacebookAuthProvider();

export function* signIn() {
  try {
    const data = yield firebase.auth().signInWithPopup(facebookProvider);
    return yield put(CurrentUserActions.signInSuccess(data));
  } catch (e) {
    if (e.response) {
      return yield put(CurrentUserActions.signInError(e.response.data));
    }

    return yield reportError(e);
  }
}

export default function* currentUserSaga() {
  yield takeLatest(CurrentUserTypes.SIGN_IN, signIn);
}
