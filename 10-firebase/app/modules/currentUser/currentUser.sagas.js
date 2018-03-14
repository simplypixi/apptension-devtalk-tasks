import { put, takeLatest } from 'redux-saga/effects';
import reportError from 'report-error';
import firebase from 'firebase';

import { CurrentUserTypes, CurrentUserActions } from './currentUser.redux';

const { auth } = firebase;
const facebookProvider = new auth.FacebookAuthProvider();

export function* signIn() {
  try {
    const data = yield firebase.auth().signInWithPopup(facebookProvider);
    const { photoURL, displayName, email, uid } = data.user;
    const userData = {
      id: uid,
      avatarUrl: photoURL,
      displayName: displayName,
      email
    };

    yield firebase.database().ref(`users/${userData.id}`).set(userData);

    return yield put(CurrentUserActions.signInSuccess(userData));
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
