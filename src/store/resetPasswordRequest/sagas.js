import { takeLatest, call, put } from 'redux-saga/effects'
import Actions, { types } from './actions'
import { ResetPasswordRequestService } from '../../services'
import { SnackActions } from '../snackBar'

function* resetPasswordRequestRequest({ resetCode }) {
  const [error, response] = yield call(
    ResetPasswordRequestService.fetchByResetCode,
    resetCode
  )
  if (error) {
    yield put(Actions.resetPaswordRequestError())
    yield put(
      SnackActions.displayError(
        'Erreur inconnue en récupérant la demande de réinitialisation de mot de passe'
      )
    )
    return
  }
  if (!response) {
    yield put(Actions.resetPaswordRequestError())
    return
  }
  yield put(Actions.resetPaswordRequestSuccess(response))
}

export default [
  takeLatest(types.RESET_PASSWORD_REQUEST_REQUEST, resetPasswordRequestRequest),
]
