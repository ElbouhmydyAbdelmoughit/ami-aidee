import { takeLatest, put, call, select } from 'redux-saga/effects'
import jwtDecode from 'jwt-decode'
import { AuthenticationService } from '../../services'
import { CommonActions } from '../common'
import { LoaderActions } from '../loader'
import { types, default as AuthActions } from './actions'
import { SnackActions } from '../snackBar'
import { Actions } from '@ami-app/react-native-router-flux'
import AuthSelectors from './selectors'
import { Alert } from 'react-native'

function* login({ username, password }) {
  yield put(LoaderActions.loading())

  const email = username
  const [error, response] = yield call(AuthenticationService.login, {
    email,
    password,
  })
  console.log(error)
  console.log(response)
  if (error) {
    yield put(LoaderActions.loaded())
    yield put(AuthActions.loginFailure())
    yield put(SnackActions.displayError('authentication_failed'))
    return
  }

  const jwt = response.data
  console.log(jwt)
  yield put(AuthActions.loginSuccess(jwt))
  const decodedToken = jwtDecode(jwt)
  console.log(decodedToken)
  yield call(
    me,
    decodedToken['https://hasura.io/jwt/claims']['x-hasura-user-id']
  )
  yield put(LoaderActions.loaded())

  Actions.root()
}

function* me(id) {
  const [error, response] = yield call(AuthenticationService.me, id)
  console.log(error)
  console.log(response)
  if (error) {
    yield put(AuthActions.loginFailure())
    yield put(SnackActions.displayError('authentication_failed'))
    return
  }
  const user = response.users[0]
  console.log(user)
  yield put(AuthActions.loginMeSuccess(user))
}

function* logout() {
  // yield call(AuthenticationService.logout)
  yield put(CommonActions.resetReducers())
  Actions.splash()
}

function* passwordResetRequest({ email }) {
  yield call(AuthenticationService.passwordResetRequest, {
    email,
  })
  Actions.passwordResetRequestConfirmed()
}

function* modifyPasswordUsingResetCodeRequest({
  userId,
  resetCode,
  newPassword,
}) {
  const [error] = yield call(AuthenticationService.resetPassword, {
    userId,
    resetCode,
    newPassword,
  })
  if (error) {
    yield put(
      SnackActions.displayError(
        'Erreur inconnue lors du demande de changement du mot de passe'
      )
    )
    return
  }
  Actions.resetPasswordConfirmed()
}

function* fetchUser() {
  const currentUserId = yield select(AuthSelectors.getUserId)
  if (!currentUserId) {
    return
  }
  const [error, response] = yield call(AuthenticationService.me, currentUserId)
  console.log(error, response)
  yield put(AuthActions.fetchUserSuccess(response.users[0]))
}
export default [
  takeLatest(types.LOGIN_REQUEST, login),
  takeLatest(types.FETCH_USER, fetchUser),
  takeLatest(types.LOGOUT, logout),
  takeLatest(types.PASSWORD_RESET_REQUEST, passwordResetRequest),
  takeLatest(
    types.MODIFY_PASSWORD_USING_RESET_CODE_REQUEST,
    modifyPasswordUsingResetCodeRequest
  ),
]
