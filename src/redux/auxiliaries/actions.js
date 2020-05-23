import { createAction } from '../../utils'

// Types
export const types = {
  AUXILIARIES_REQUEST: 'AUXILIARIES_REQUEST',
  AUXILIARIES_FAILURE: 'AUXILIARIES_FAILURE',
  AUXILIARIES_SUCCESS: 'AUXILIARIES_SUCCESS',

  AUXILIARIES_CREATE_REQUEST: 'AUXILIARIES_CREATE_REQUEST',
  AUXILIARIES_CREATE_FAILURE: 'AUXILIARIES_CREATE_FAILURE',
  AUXILIARIES_CREATE_SUCCESS: 'AUXILIARIES_CREATE_SUCCESS',

  AUXILIARIES_MODIFY_REQUEST: 'AUXILIARIES_MODIFY_REQUEST',
  AUXILIARIES_MODIFY_FAILURE: 'AUXILIARIES_MODIFY_FAILURE',
  AUXILIARIES_MODIFY_SUCCESS: 'AUXILIARIES_MODIFY_SUCCESS',

  AUXILIARIES_DELETE_REQUEST: 'AUXILIARIES_DELETE_REQUEST',
  AUXILIARIES_DELETE_FAILURE: 'AUXILIARIES_DELETE_FAILURE',
  AUXILIARIES_DELETE_SUCCESS: 'AUXILIARIES_DELETE_SUCCESS',
  MY_AUXILIARIES_REQUEST: 'MY_AUXILIARIES_REQUEST',
}

// Actions
export default {
  /** REQUEST */
  auxiliariesRequest: (filters = {}) =>
    createAction(types.AUXILIARIES_REQUEST, { filters }),
  auxiliariesSuccess: auxiliaries =>
    createAction(types.AUXILIARIES_SUCCESS, { auxiliaries }),
  auxiliariesFailure: () => createAction(types.AUXILIARIES_FAILURE),

  auxiliariesCreateRequest: (filters = {}) =>
    createAction(types.AUXILIARIES_CREATE_REQUEST, { filters }),
  auxiliariesCreateSuccess: auxiliaries =>
    createAction(types.AUXILIARIES_CREATE_SUCCESS, { auxiliaries }),
  auxiliariesCreateFailure: () =>
    createAction(types.AUXILIARIES_CREATE_FAILURE),

  auxiliariesModifyRequest: (auxiliary = {}) =>
    createAction(types.AUXILIARIES_MODIFY_REQUEST, { auxiliary }),
  auxiliariesModifySuccess: auxiliaries =>
    createAction(types.AUXILIARIES_MODIFY_SUCCESS, { auxiliaries }),
  auxiliariesModifyFailure: () =>
    createAction(types.AUXILIARIES_MODIFY_FAILURE),

  auxiliariesDeleteRequest: id =>
    createAction(types.AUXILIARIES_DELETE_REQUEST, { id }),
  auxiliariesDeleteSuccess: id =>
    createAction(types.AUXILIARIES_DELETE_SUCCESS, { id }),
  auxiliariesDeleteFailure: () =>
    createAction(types.AUXILIARIES_DELETE_FAILURE),
  myAuxiliariesRequest: () => createAction(types.MY_AUXILIARIES_REQUEST),
}
