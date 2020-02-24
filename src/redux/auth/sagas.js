import { takeLatest, put, call } from "redux-saga/effects"
import jwtDecode from "jwt-decode"
import { AuthenticationService } from "../../services"
import { CommonActions } from "../common"
import { LoaderActions } from "../loader"
import { types, default as AuthActions } from "./actions"
import { SnackActions } from "../snackBar"
import { Actions } from "react-native-router-flux"

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
    yield put(SnackActions.displayError("authentication_failed"))
    return
  }

  const jwt = response.data
  console.log(jwt)
  yield put(AuthActions.loginSuccess(jwt))
  const decodedToken = jwtDecode(jwt)
  console.log(decodedToken)
  yield call(
    me,
    decodedToken["https://hasura.io/jwt/claims"]["x-hasura-user-id"]
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
    yield put(SnackActions.displayError("authentication_failed"))
    return
  }
  const user = response.users[0]
  console.log(user)
  yield put(AuthActions.loginMeSuccess(user))
}

function* logout() {
  yield put(AuthenticationService.logout())
  yield put(CommonActions.resetReducers())
  yield put(push("/"))
}

export default [
  takeLatest(types.LOGIN_REQUEST, login),
  takeLatest(types.LOGOUT, logout),
]
