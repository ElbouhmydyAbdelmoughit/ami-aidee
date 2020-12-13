import { createAction } from '../../utils'

export const types = {
  EXPIRATION_IN_10DAYS_WARNING_DISPLAYED:
    'EXPIRATION_IN_10DAYS_WARNING_DISPLAYED',
  EXPIRATION_IN_5DAYS_WARNING_DISPLAYED:
    'EXPIRATION_IN_5DAYS_WARNING_DISPLAYED',
}

export default {
  expirationIn10DaysWarningDisplayed: () => {
    return createAction(types.EXPIRATION_IN_10DAYS_WARNING_DISPLAYED)
  },
  expirationIn5DaysWarningDisplayed: () => {
    return createAction(types.EXPIRATION_IN_5DAYS_WARNING_DISPLAYED)
  },
}
