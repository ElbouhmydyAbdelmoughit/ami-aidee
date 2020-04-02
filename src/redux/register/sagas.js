import { delay } from "redux-saga"
import { takeLatest, put, select, call } from "redux-saga/effects"
import actions, { types } from "./actions"
import { LoaderActions } from "../loader"
import { UsersService } from "src/services"
import { SnackActions } from "../snackBar"

function* userCreateOnError(error) {
  yield put(LoaderActions.loaded())
  if (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.error === "user_existed"
  ) {
    yield put(
      SnackActions.displayError("Il existe déjà un compte lié à cet email")
    )
  } else {
    yield put(SnackActions.displayError("Le compte n'a pas pu être créer"))
  }
}

function* registerRequest() {
  const userToRegister = yield select(state => state.register.data)

  console.log(userToRegister)
  yield put(LoaderActions.loading())
  const [userCreateError, userResponse] = yield call(
    UsersService.createUser,
    userToRegister
  )
  if (userCreateError) {
    yield call(userCreateOnError, userCreateError)
    return
  }
  console.log("hihi")
}

export default [takeLatest(types.REGISTER_REQUEST, registerRequest)]
