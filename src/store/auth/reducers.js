import { createReducer } from 'reduxsauce'
import { types } from './actions'

const initialState = {
  jwt: null,
  user: null,
  attempts: 0,
  user_blocked: false,
}

// region Reducers
const loginAttempt = (state = initialState) => {
  const { attempts } = state
  return { ...state, attempts: attempts + 1 }
}

const loginFailed = (state = initialState) => {
  const { attempts } = state
  return { ...state, user_blocked: attempts >= 5 }
}

const loginSuccess = (state = initialState, action) => {
  const { jwt } = action
  return { ...state, jwt, attempts: 0 }
}

const fetchUserSuccess = (state = initialState, action) => {
  return {
    ...state,
    user: action.user,
  }
}

const loginMeSuccees = (state = initialState, action) => {
  const { user } = action
  return { ...state, user, attempts: 0 }
}

const logout = () => {
  return { ...initialState }
}
// endregion

export default createReducer(initialState, {
  [types.LOGIN_REQUEST]: loginAttempt,
  [types.LOGOUT]: logout,
  [types.LOGIN_FAILURE]: loginFailed,
  [types.LOGIN_SUCCESS]: loginSuccess,
  [types.LOGIN_ME_SUCCESS]: loginMeSuccees,
  [types.FETCH_USER_SUCCESS]: fetchUserSuccess,
})
