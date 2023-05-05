import { createAction } from '../../utils'

export const types = {
  EXPIRATION_IN_10DAYS_WARNING_DISPLAYED:
    'EXPIRATION_IN_10DAYS_WARNING_DISPLAYED',
  EXPIRATION_IN_5DAYS_WARNING_DISPLAYED:
    'EXPIRATION_IN_5DAYS_WARNING_DISPLAYED',
  SET_APPLICATION_LANGUAGE: 'SET_APPLICATION_LANGUAGE',
  INITIALIZE_APPLICATION_LANGUAGE: 'INITIALIZE_APPLICATION_LANGUAGE',
}

const NavigationActions = {
  expirationIn10DaysWarningDisplayed: () => {
    return createAction(types.EXPIRATION_IN_10DAYS_WARNING_DISPLAYED)
  },
  expirationIn5DaysWarningDisplayed: () => {
    return createAction(types.EXPIRATION_IN_5DAYS_WARNING_DISPLAYED)
  },
  setApplicationLanguage: lang => {
    return createAction(types.SET_APPLICATION_LANGUAGE, { lang })
  },
  initializeApplicationLanguage() {
    return createAction(types.INITIALIZE_APPLICATION_LANGUAGE)
  },
}

export default NavigationActions
