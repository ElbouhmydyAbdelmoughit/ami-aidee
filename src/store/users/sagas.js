import { call, put,select, takeLatest } from 'redux-saga/effects'

import { UsersService } from '../../services'
import { AuthSelectors } from '../auth'
import UserActions, { types } from './actions'

function* registerTokenRequest({ token, os }) {
  const currentUserId = yield select(AuthSelectors.getUserId)

  const [error, response] = yield call(UsersService.regToken, {
    userId: currentUserId,
    token,
  })
  if (error) {
    // TODO: handle error
    return
  }
  if (response.user_google_reg_tokens.length === 1) {
    yield put(UserActions.tokenAlreadyExists())
    return
  }
  const [, response2] = yield call(UsersService.createRegToken, {
    userId: currentUserId,
    token,
    os,
  })
  yield put(
    UserActions.registerTokenSuccess(
      response2.insert_user_google_reg_tokens.returning[0].id
    )
  )
}

export default [takeLatest(types.REGISTER_TOKEN_REQUEST, registerTokenRequest)]
