import { put, takeLatest } from 'redux-saga/effects';
import reportError from 'report-error';

import { NotesTypes, NotesActions } from './notes.redux';


export function* watchNotes() {
  try {
    console.log('Notes saga started!');
  } catch(error) {
    /* istanbul ignore next */
    reportError(error);
  }
}
