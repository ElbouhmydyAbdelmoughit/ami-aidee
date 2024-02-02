import { call, put,select, takeLatest } from 'redux-saga/effects'

import { UsersService } from '../../services'
import { AuthSelectors } from '../auth'
import UserActions, { types } from './actions'

import udpLogger from '../../services/udpLogger';

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c == "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}


function* registerTokenRequest({ token, os }) {
  const sessiondUUID = uuidv4();
  udpLogger.initialize();
  udpLogger.sendLogMessage(sessiondUUID, 'Enter registerTokenRequest ', token);

  const currentUserId = yield select(AuthSelectors.getUserId)
  udpLogger.sendLogMessage(sessiondUUID, 'currentUserId ', currentUserId);

  const [error, response] = yield call(UsersService.regToken, {
    userId: currentUserId,
    token,
  })
  if (error) {
    udpLogger.sendLogMessage(sessiondUUID, 'Error call(UsersService.regToken(..)) ', error);
    return
  }
  udpLogger.sendLogMessage(sessiondUUID, 'Response call(UsersService.regToken(..)) ', response);

  if (response.user_google_reg_tokens.length === 1) {
    udpLogger.sendLogMessage(sessiondUUID, 'Exit put(UserActions.tokenAlreadyExists()) ');
    yield put(UserActions.tokenAlreadyExists())
    return
  }

  udpLogger.sendLogMessage(sessiondUUID, 'call(UsersService.createRegToken(..)) ');
  const [error2, response2] = yield call(UsersService.createRegToken, {
    userId: currentUserId,
    token,
    os,
  })

  if (error2) {
    udpLogger.sendLogMessage(sessiondUUID, 'Error call(UsersService.createRegToken(..)) ', error2);
    return
  }
  udpLogger.sendLogMessage(sessiondUUID, 'Response call(UsersService.createRegToken(..)) ', response2);

  udpLogger.sendLogMessage(sessiondUUID, 'Response UserActions.registerTokenSuccess(..)) ', response2);

  yield put(
    UserActions.registerTokenSuccess(
      response2.insert_user_google_reg_tokens.returning[0].id
    )
  )
  udpLogger.sendLogMessage(sessiondUUID, 'Exit registerTokenRequest ', token);
}

export default [takeLatest(types.REGISTER_TOKEN_REQUEST, registerTokenRequest)]
