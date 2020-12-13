import { createReducer } from "reduxsauce"
import { types } from "./actions"

const initialState = {
  message: "",
  displayed: false,
}

const displaySnackBar = (state = initialState) => {
  return { ...state, displayed: true }
}

const hideSnackBar = (state = initialState) => {
  return { ...state, displayed: false }
}

const message = (state = initialState, action) => {
  return { ...state, message: action.message, level: action.level }
}

export default createReducer(initialState, {
  [types.SET_MESSAGE]: message,
  [types.HIDE_SNACK_BAR]: hideSnackBar,
  [types.DISPLAY_SNACK_BAR]: displaySnackBar,
})
