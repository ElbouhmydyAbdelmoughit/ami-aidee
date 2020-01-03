import { createAction } from '../../utils';

// Types
export const types = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ME_SUCCESS: 'LOGIN_ME_SUCCESS',
  LOGOUT: 'LOGOUT',
};

// Actions
export default {
  loginRequest: (username, password) =>
    createAction(types.LOGIN_REQUEST, {username, password}),

  loginSuccess: (jwt) =>
    createAction(types.LOGIN_SUCCESS, {jwt}),

  loginMeSuccess: (user) =>
    createAction(types.LOGIN_ME_SUCCESS, {user}),

  loginFailure: () =>
    createAction(types.LOGIN_FAILURE),

  logout: () =>
    createAction(types.LOGOUT),
};
