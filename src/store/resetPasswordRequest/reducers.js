import { createReducer } from 'reduxsauce'

import { types } from './actions'

const initialState = {
  loading: false,
  list: {},
}

const resetPasswordRequestRequest = (state = initialState) => ({
  ...state,
  loading: true,
  list: {},
})

const resetPasswordRequestSuccess = (state = initialState, { data }) => ({
  ...state,
  loading: false,
  list: { [data.id]: data },
})

const resetPasswordRequestError = (state = initialState) => ({
  ...state,
  loading: false,
})

export default createReducer(initialState, {
  [types.RESET_PASSWORD_REQUEST_REQUEST]: resetPasswordRequestRequest,
  [types.RESET_PASSWORD_REQUEST_SUCCESS]: resetPasswordRequestSuccess,
  [types.RESET_PASSWORD_REQUEST_ERROR]: resetPasswordRequestError,
})
