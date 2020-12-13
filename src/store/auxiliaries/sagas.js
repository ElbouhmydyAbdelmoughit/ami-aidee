import { takeLatest, put, call, select } from 'redux-saga/effects'
import { AuxiliariesService } from '../../services'
import { LoaderActions } from '../loader'
import { SnackActions } from '../snackBar'
import { types, default as AuxiliaryAction } from './actions'

function* auxiliariesCreateRequest({ filters }) {
  yield put(LoaderActions.loading())
  const [error, response] = yield call(
    AuxiliariesService.createAuxiliary,
    filters
  )
  console.log(error)
  console.log(response)
  const auxiliaries = response.insert_auxiliaries.returning
  yield put(AuxiliaryAction.auxiliariesCreateSuccess(auxiliaries))
  console.log(response)
  if (error) {
    yield put(LoaderActions.loaded())
    yield put(SnackActions.displayError('auxiliary_create_error'))
    yield put(AuxiliaryAction.auxiliaryCreateFailure())
  } else {
    yield put(LoaderActions.loaded())
    yield put(SnackActions.displayInfo('auxiliary_create_success'))
  }
}

function* auxiliariesRequest({ filters }) {
  console.log(filters)

  const [error, response] = yield call(AuxiliariesService.auxiliaries, filters)
  console.log(error)
  console.log(response)
  if (!error && response)
    yield put(AuxiliaryAction.auxiliariesSuccess(response.auxiliaries))
  else {
    yield put(AuxiliaryAction.auxiliariesFailure())
  }
}

function* auxiliariesDeleteRequest({ id }) {
  console.log(`delete: ${id}`)
  const [error, response] = yield call(AuxiliariesService.deleteAuxiliary, id)
  console.log(error)
  console.log(response)
  yield put(AuxiliaryAction.auxiliariesDeleteSuccess(id))
  if (error) {
    yield put(LoaderActions.loaded())
    yield put(SnackActions.displayError('auxiliary_delete_error'))
    yield put(AuxiliaryAction.auxiliariesDeleteFailure())
  } else {
    yield put(LoaderActions.loaded())
    yield put(SnackActions.displayInfo('auxiliary_delete_success'))
  }
}

function* auxiliariesModifyRequest({ auxiliary }) {
  console.log('SAGA')
  console.log(auxiliary)
  yield put(LoaderActions.loading())
  const id = auxiliary.id
  const aux = auxiliary
  const [error, response] = yield call(AuxiliariesService.modifyAuxiliary, {
    id,
    aux,
  })
  console.log(error)
  console.log(response)
  const auxiliaries = response.update_auxiliaries.returning
  yield put(AuxiliaryAction.auxiliariesModifySuccess(auxiliaries))
  if (error) {
    yield put(LoaderActions.loaded())
    yield put(SnackActions.displayError('auxiliary_modify_error'))
    yield put(AuxiliaryAction.auxiliariesModifyFailure())
  } else {
    yield put(LoaderActions.loaded())
    yield put(SnackActions.displayInfo('auxiliary_modify_success'))
  }
}

function* myAuxilariesRequest() {
  const myHelpedUserId = yield select(
    state => state.auth.user.helped_users[0].id
  )
  yield put(
    AuxiliaryAction.auxiliariesRequest({
      helpedUserId: myHelpedUserId,
    })
  )
}
export default [
  takeLatest(types.AUXILIARIES_REQUEST, auxiliariesRequest),
  takeLatest(types.AUXILIARIES_CREATE_REQUEST, auxiliariesCreateRequest),
  takeLatest(types.AUXILIARIES_DELETE_REQUEST, auxiliariesDeleteRequest),
  takeLatest(types.AUXILIARIES_MODIFY_REQUEST, auxiliariesModifyRequest),
  takeLatest(types.MY_AUXILIARIES_REQUEST, myAuxilariesRequest),
]
