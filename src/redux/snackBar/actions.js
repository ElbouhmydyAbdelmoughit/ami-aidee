import { createAction } from "../../utils/index"

// Types
export const types = {
  SET_MESSAGE: "SET_MESSAGE",
  DISPLAY_SNACK_BAR: "DISPLAY_SNACK_BAR",
  DISPLAY_ERROR: "DISPLAY_ERROR",
  DISPLAY_WARNING: "DISPLAY_WARNING",
  DISPLAY_INFO: "DISPLAY_INFO",
  HIDE_SNACK_BAR: "HIDE_SNACK_BAR",
}

// Actions
export default {
  setMessage: (message, level) =>
    createAction(types.SET_MESSAGE, { message, level }),

  displaySnackBar: () => createAction(types.DISPLAY_SNACK_BAR),

  displayError: (message, timeout = 5000) =>
    createAction(types.DISPLAY_ERROR, {
      message,
      level: -1,
      timeout,
    }),

  displayInfo: (message, timeout = 5000) =>
    createAction(types.DISPLAY_INFO, {
      message,
      level: 0,
      timeout,
    }),

  displayWarning: (message, timeout = 5000) =>
    createAction(types.DISPLAY_WARNING, {
      message,
      level: 2,
      timeout,
    }),

  hideSnackBar: () => createAction(types.HIDE_SNACK_BAR),
}
