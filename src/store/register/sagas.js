import { t } from 'i18next'
import { call,put, select, takeLatest } from 'redux-saga/effects'
import { HelpedUsersService,UsersService } from 'src/services'

import { AuthActions } from '../auth'
import { LoaderActions } from '../loader'
import { SnackActions } from '../snackBar'
import { types } from './actions'

function* userCreateOnError(error) {
  if (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.error === 'user_existed'
  ) {
    yield put(
      SnackActions.displayError(
        t(
          'screen.register.duplicate_email_error',
          'Il existe déjà un compte lié à cet email'
        )
      )
    )
  } else {
    yield put(
      SnackActions.displayError(
        t(
          'screen.register.unknown_create_error',
          "Le compte n'a pas pu être créé"
        )
      )
    )
  }
}

function* registerRequest() {
  const userToRegister = yield select(state => state.register.data)

  console.log(userToRegister)
  yield put(LoaderActions.loading())
  try {
    const [userCreateError, userResponse] = yield call(
      UsersService.createUser,
      userToRegister
    )
    if (userCreateError) {
      yield call(userCreateOnError, userCreateError)
      return
    }
    const [error, response] = yield call(HelpedUsersService.createUser, {
      ...userToRegister,
      user_id: userResponse.data.id,
    })
    console.log(error)
    if (error) {
      console.log('impossible')
      return
    }
    yield put(
      SnackActions.displayInfo(
        t('screen.register.account_created', 'Votre compte a été créé')
      )
    )
  } finally {
    yield put(LoaderActions.loaded())
  }
  yield put(
    AuthActions.loginRequest(userToRegister.email, userToRegister.password)
  )
}

export default [takeLatest(types.REGISTER_REQUEST, registerRequest)]
