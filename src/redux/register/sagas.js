import { delay } from "redux-saga"
import { takeLatest, put, select, call } from "redux-saga/effects"
import actions, { types } from "./actions"
import { LoaderActions } from "../loader"
import { UsersService, HelpedUsersService } from "src/services"
import { SnackActions } from "../snackBar"
import { AuthActions } from "../auth"

function* userCreateOnError(error) {
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
      console.log("impossible")
      return
    }
    yield put(SnackActions.displayInfo("Votre compte a été créé"))
  } finally {
    yield put(LoaderActions.loaded())
  }
  yield put(
    AuthActions.loginRequest(userToRegister.email, userToRegister.password)
  )
}

export default [takeLatest(types.REGISTER_REQUEST, registerRequest)]
