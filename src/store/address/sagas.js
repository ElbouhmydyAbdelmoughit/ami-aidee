import { call,put, takeLatest } from 'redux-saga/effects'

import { AddressesService } from '../../services'
import { LoaderActions } from '../loader'
import { SnackActions } from '../snackBar'
import { default as AddressAction,types } from './actions'

function* addressesRequest({ filters }) {
  console.log(filters)
  const [error, response] = yield call(AddressesService.addresses, filters)
  console.log(error)
  console.log(response)
  if (!error && response) {
    yield put(AddressAction.addressesSuccess(response.addresses))
  } else {
    yield put(AddressAction.addressesFailure())
  }
}

function* addressesCreateRequest({ filters }) {
  yield put(LoaderActions.loading())
  console.log(filters)
  const [error, response] = yield call(AddressesService.createAddress, filters)
  if (error) {
    yield put(LoaderActions.loaded())
    yield put(SnackActions.displayError('address_create_error'))
  } else {
    yield put(LoaderActions.loaded())
    yield put(SnackActions.displayInfo('address_create_success'))
  }
  console.log(error)
  console.log(response)
  const addresses = response.insert_addresses.returning
  yield put(AddressAction.addressesCreateSuccess(addresses))
}

function* addressesDeleteRequest({ id }) {
  const [error, response] = yield call(AddressesService.deleteAddress, id)
  if (error) {
    yield put(LoaderActions.loaded())
    yield put(SnackActions.displayError('address_delete_error'))
  } else {
    yield put(LoaderActions.loaded())
    yield put(SnackActions.displayInfo('address_delete_success'))
  }
  console.log(error)
  console.log(response)
  yield put(AddressAction.addressesDeleteSuccess(id))
}

function* addressesModifyRequest({ address }) {
  console.log(address)
  yield put(LoaderActions.loading())
  const { id } = address
  const [error, response] = yield call(AddressesService.modifyAddress, {
    id,
    address,
  })
  console.log(error)
  console.log(response)
  const addresses = response.update_addresses.returning
  console.log(addresses)
  yield put(AddressAction.addressesModifySuccess(addresses))
  if (error) {
    yield put(LoaderActions.loaded())
    yield put(SnackActions.displayError('address_modify_error'))
  } else {
    yield put(LoaderActions.loaded())
    yield put(SnackActions.displayInfo('address_modify_success'))
  }
}

function* addressesPDFRequest({ id }) {
  const [error, response] = yield call(AddressesService.pdfAddress, id)
  if (error) {
    yield put(SnackActions.displayError('address_pdf_error'))
  } else {
    yield put(SnackActions.displayInfo('address_pdf_success'))
  }
  console.log(error)
  console.log(response)
  yield put(AddressAction.addressesPDFSuccess(id))
}

export default [
  takeLatest(types.ADDRESSES_REQUEST, addressesRequest),
  takeLatest(types.ADDRESSES_CREATE_REQUEST, addressesCreateRequest),
  takeLatest(types.ADDRESSES_DELETE_REQUEST, addressesDeleteRequest),
  takeLatest(types.ADDRESSES_MODIFY_REQUEST, addressesModifyRequest),
  takeLatest(types.ADDRESSES_PDF_REQUEST, addressesPDFRequest),
]
