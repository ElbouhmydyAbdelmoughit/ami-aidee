import { createAction } from '../../utils/index'

// Types
export const types = {
  RESET_REDUCERS: 'RESET_REDUCERS',
}

// Actions
export default {
  resetReducers: () => createAction(types.RESET_REDUCERS),
}
