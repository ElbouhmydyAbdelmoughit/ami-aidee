import { createAction } from '../../utils'

// Types
export const types = {
  REGISTER_TOKEN_REQUEST: 'REGISTER_TOKEN_REQUEST',
  TOKEN_ALREADY_EXISTS: 'TOKEN_ALREADY_EXISTS',
  REGISTER_TOKEN_SUCCESS: 'REGISTER_TOKEN_SUCCESS',
}

// Actions
export default {
  registerTokenRequest: token =>
    createAction(types.REGISTER_TOKEN_REQUEST, token),
  tokenAlreadyExists: () => createAction(types.TOKEN_ALREADY_EXISTS),
  registerTokenSuccess: id =>
    createAction(types.REGISTER_TOKEN_SUCCESS, { id }),
}
