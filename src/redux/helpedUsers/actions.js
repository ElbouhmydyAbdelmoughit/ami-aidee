import { createAction } from '../../utils'

// Types
export const types = {
  USERS_REQUEST: 'USERS_REQUEST',
  USERS_FAILURE: 'USERS_FAILURE',
  USERS_SUCCESS: 'USERS_SUCCESS',

  USERS_CREATE_REQUEST: 'USERS_CREATE_REQUEST',
  USERS_CREATE_SUCCESS: 'USERS_CREATE_SUCCESS',

  USERS_DELETE_REQUEST: 'USERS_DELETE_REQUEST',
  USERS_DELETE_SUCCESS: 'USERS_DELETE_SUCCESS',

  USERS_MODIFY_REQUEST: 'USERS_MODIFY_REQUEST',
  USERS_MODIFY_SUCCESS: 'USERS_MODIFY_SUCCESS',
}

// Actions
export default {
  /** REQUEST */
  usersRequest: (filters = {}) =>
    createAction(types.USERS_REQUEST, { filters }),

  usersSuccess: users => createAction(types.USERS_SUCCESS, { users }),

  usersFailure: () => createAction(types.USERS_FAILURE),

  usersModifyRequest: (user = {}) =>
    createAction(types.USERS_MODIFY_REQUEST, { user }),
  usersModifySuccess: users =>
    createAction(types.USERS_MODIFY_SUCCESS, { users }),

  usersDeleteRequest: id => createAction(types.USERS_DELETE_REQUEST, { id }),
  usersDeleteSuccess: id => createAction(types.USERS_DELETE_SUCCESS, { id }),

  usersCreateRequest: (filters = {}) =>
    createAction(types.USERS_CREATE_REQUEST, { filters }),
  usersCreateSuccess: users =>
    createAction(types.USERS_CREATE_SUCCESS, { users }),
}
