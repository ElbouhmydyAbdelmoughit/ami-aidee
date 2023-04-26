import { createAction } from '../../utils'

// Types
export const types = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
}

// Actions
export default {
  loaded: () => createAction(types.LOADED),

  loading: () => createAction(types.LOADING),
}
