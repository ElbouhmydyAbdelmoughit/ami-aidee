import { delay } from "redux-saga"
import { takeLatest, put, select } from "redux-saga/effects"
import actions, { types } from "./actions"
import { LoaderActions } from "../loader"

function* registerRequest() {
  const userToRegister = yield select(state => state.register.data)

  console.log(userToRegister)
  yield put(LoaderActions.loading())
}

export default [takeLatest(types.REGISTER_REQUEST, registerRequest)]
