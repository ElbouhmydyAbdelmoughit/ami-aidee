import { createAction } from '../../utils'

// Types
export const types = {
  LINK_UPDATE_SUCCESS: 'LINK_UPDATE_SUCCESS',
}

// Actions
export default {
  linkUpdateSuccess: link =>
    createAction(types.LINK_UPDATE_SUCCESS, {
      link,
    }),
}
