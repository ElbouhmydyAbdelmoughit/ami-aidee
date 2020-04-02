import { createReducer } from "reduxsauce"
import { levelColor } from "../../ui/components/snackBar/levelColor"
import { types } from "./actions"

const initialState = {
  data: {},
}

const clearRegisterUser = (state = initialState) => {
  return initialState
}

const setRegisterUser = (state = initialState, action) => {
  return {
    ...state,
    data: {
      ...state.data,
      ...action.data,
    },
  }
}

export default createReducer(initialState, {
  [types.SET_REGISTER_USER]: setRegisterUser,
  [types.CLEAR_REGISTER_USER]: clearRegisterUser,
})
