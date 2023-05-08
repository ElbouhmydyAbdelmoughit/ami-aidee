import { createAction } from '../../utils'

// Types
export const types = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ME_SUCCESS: 'LOGIN_ME_SUCCESS',
  LOGOUT: 'LOGOUT',
  PASSWORD_RESET_REQUEST: 'PASSWORD_RESET_REQUEST',
  MODIFY_PASSWORD_USING_RESET_CODE_REQUEST:
    'MODIFY_PASSWORD_USING_RESET_CODE_REQUEST',
  FETCH_USER: 'FETCH_USER',
  FETCH_USER_SUCCESS: 'FETCH_USER_SUCCESS',
}

// Actions
export default {
  loginRequest: (username, password, invalid) =>
    createAction(types.LOGIN_REQUEST, { username, password, invalid }),

  loginSuccess: jwt => createAction(types.LOGIN_SUCCESS, { jwt }),

  loginMeSuccess: user => createAction(types.LOGIN_ME_SUCCESS, { user }),

  loginFailure: () => createAction(types.LOGIN_FAILURE),

  logout: () => createAction(types.LOGOUT),
  passwordResetRequest: email =>
    createAction(types.PASSWORD_RESET_REQUEST, { email }),
  fetchUser: () => createAction(types.FETCH_USER),
  fetchUserSuccess: user => createAction(types.FETCH_USER_SUCCESS, { user }),
  modifyPasswordUsingResetCodeRequest: ({ userId, resetCode, newPassword }) =>
    createAction(types.MODIFY_PASSWORD_USING_RESET_CODE_REQUEST, {
      userId,
      resetCode,
      newPassword,
    }),
}
