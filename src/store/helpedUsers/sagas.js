import errorReporter from 'core/error-reporter'
import { takeLatest, put, call } from 'redux-saga/effects'
import { HelpedUsersService } from '../../services'
import { LoaderActions } from '../loader'
import { SnackActions } from '../snackBar'
import { types, default as UserAction } from './actions'

function* usersRequest({ filters }) {
  console.log(filters)

  const [error, response] = yield call(HelpedUsersService.users, filters)
  console.log(error)
  console.log(response)
  if (!error && response) {
    yield put(UserAction.usersSuccess(response.helped_users))
  } else {
    yield put(UserAction.usersFailure())
  }
}

function* usersCreateRequest({ filters }) {
  yield put(LoaderActions.loading())
  const [error, response] = yield call(HelpedUsersService.createUser, filters)
  console.log(error)
  console.log(response)
  const users = response.insert_helped_users.returning
  yield put(UserAction.usersCreateSuccess(users))
  if (error) {
    yield put(LoaderActions.loaded())
    yield put(SnackActions.displayError('user_create_error'))
  } else {
    yield put(LoaderActions.loaded())
    yield put(SnackActions.displayInfo('user_create_success'))
  }
}

function* usersDeleteRequest({ id }) {
  console.log('delete user')
  console.log(id)
  const [error, response] = yield call(HelpedUsersService.deleteUser, id)
  console.log(error)
  console.log(response)
  yield put(UserAction.usersDeleteSuccess(id))
  if (error) {
    yield put(LoaderActions.loaded())
    yield put(SnackActions.displayError('user_delete_error'))
  } else {
    yield put(LoaderActions.loaded())
    yield put(SnackActions.displayInfo('user_delete_success'))
  }
}

function* usersModifyRequest({ user }) {
  yield put(LoaderActions.loading())
  const { id, ...otherUserData } = user

  const [error, response] = yield call(HelpedUsersService.modifyUser, {
    id,
    user: otherUserData,
  })

  if (error) {
    yield put(LoaderActions.loaded())
    yield put(SnackActions.displayError('user_modify_error'))
    errorReporter.report(error)
    return
  }
  const users = response.update_helped_users.returning

  yield put(UserAction.usersModifySuccess(users))

  yield put(LoaderActions.loaded())
}

export default [
  takeLatest(types.USERS_REQUEST, usersRequest),
  takeLatest(types.USERS_CREATE_REQUEST, usersCreateRequest),
  takeLatest(types.USERS_DELETE_REQUEST, usersDeleteRequest),
  takeLatest(types.USERS_MODIFY_REQUEST, usersModifyRequest),
]
