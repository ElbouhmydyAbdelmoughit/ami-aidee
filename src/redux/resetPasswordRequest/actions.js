import { createAction } from '../../utils'

// Types
export const types = {
  LINK_UPDATE_SUCCESS: 'LINK_UPDATE_SUCCESS',
  RESET_PASSWORD_REQUEST_REQUEST: 'RESET_PASSWORD_REQUEST_REQUEST',
  RESET_PASSWORD_REQUEST_SUCCESS: 'RESET_PASSWORD_REQUEST_SUCCESS',
  RESET_PASSWORD_REQUEST_ERROR: 'RESET_PASSWORD_REQUEST_ERROR',
}

// Actions
export default {
  resetPaswordRequestRequest: resetCode =>
    createAction(types.RESET_PASSWORD_REQUEST_REQUEST, {
      resetCode,
    }),
  resetPaswordRequestSuccess: data =>
    createAction(types.RESET_PASSWORD_REQUEST_SUCCESS, {
      data,
    }),
  resetPaswordRequestError: () =>
    createAction(types.RESET_PASSWORD_REQUEST_ERROR),
}
