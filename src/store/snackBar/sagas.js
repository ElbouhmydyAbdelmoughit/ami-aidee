import { delay } from 'redux-saga';
import { takeLatest, put } from 'redux-saga/effects';
import actions, { types } from './actions';

function* displayMessage({message, level, timeout = 3500}) {
  yield put(actions.setMessage(message, level));
  yield put(actions.displaySnackBar());
  yield delay(timeout);
  yield put(actions.hideSnackBar());
}

export default [
  takeLatest(types.DISPLAY_ERROR, displayMessage),
  takeLatest(types.DISPLAY_WARNING, displayMessage),
  takeLatest(types.DISPLAY_INFO, displayMessage),
  takeLatest(types.HIDE_SNACK_BAR, actions.hideSnackBar),
];
