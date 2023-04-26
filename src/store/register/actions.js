import { createAction } from '../../utils/index'

export const types = {
  SET_REGISTER_USER: 'SET_REGISTER_USER',
  CLEAR_REGISTER_USER: 'CLEAR_REGISTER_SER',
  REGISTER_REQUEST: 'REGISTER_REQUEST',
}

export default {
  setResiterUser: data => createAction(types.SET_REGISTER_USER, { data }),
  clearRegisterUser: () => createAction(types.CLEAR_REGISTER_USER),
  registerRequest: () => createAction(types.REGISTER_REQUEST),
}
