import { takeLatest, put, call,  } from 'redux-saga/effects';
import { UsersService } from '../../services';
import { LoaderActions } from '../loader';
import { SnackActions } from '../snackBar';
import { types, default as UserAction } from './actions';

function* usersRequest({filters}) {
  console.log(filters)

  const [error, response] =  yield call(UsersService.users, filters);
  console.log(error)
  console.log(response)
  if (!error && response) yield put(UserAction.usersSuccess(response.helped_users));
  else {
    yield put(UserAction.usersFailure())
  }
}

function* usersCreateRequest({filters}) {
  yield put(LoaderActions.loading())
  const [error, response] =  yield call(UsersService.createUser, filters);
  console.log(error)
  console.log(response)
  const users = response.insert_helped_users.returning
  yield put(UserAction.usersCreateSuccess(users));
  if (error) {
    yield put(LoaderActions.loaded())
    yield put(SnackActions.displayError("user_create_error"))
    return
  } else {
    yield put(LoaderActions.loaded())
    yield put(SnackActions.displayInfo("user_create_success"))    
  }
}

function* usersDeleteRequest({id}) {
  console.log("delete user")
  console.log(id)
  const [error, response] =  yield call(UsersService.deleteUser, id);
  console.log(error)
  console.log(response)
  yield put(UserAction.usersDeleteSuccess(id));
  if (error) {
    yield put(LoaderActions.loaded())
    yield put(SnackActions.displayError("user_delete_error"))
    return
  } else {
    yield put(LoaderActions.loaded())
    yield put(SnackActions.displayInfo("user_delete_success"))
  }
}

function* usersModifyRequest({user}) {
  console.log("user")
  console.log(user)
  yield put(LoaderActions.loading())
  const id = user.id
  const [error, response] =  yield call(UsersService.modifyUser, {id, user});
  
  console.log("response")
  console.log(error)
  console.log(response)
  const users = response.update_helped_users.returning
  console.log(users)
  yield put(UserAction.usersModifySuccess(users));
  if (error) {
    yield put(LoaderActions.loaded())
    yield put(SnackActions.displayError("user_modify_error"))
    return
  } else {
    yield put(LoaderActions.loaded())
    yield put(SnackActions.displayInfo("user_modify_success"))
  }
}

export default [
  takeLatest(types.USERS_REQUEST, usersRequest),
  takeLatest(types.USERS_CREATE_REQUEST, usersCreateRequest),
  takeLatest(types.USERS_DELETE_REQUEST, usersDeleteRequest),
  takeLatest(types.USERS_MODIFY_REQUEST, usersModifyRequest),
];
