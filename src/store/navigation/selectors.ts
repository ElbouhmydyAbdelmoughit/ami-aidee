import { ReturnToHomeState, ScreenSavingState } from './actions'

const isExpirationIn5DaysExpired = state => {
  return state.navigation.expirationIn5DaysDisplayed
}

const isExpirationIn10DaysExpired = state => {
  return state.navigation.expirationIn10DaysDisplayed
}

const getApplicationLanguage = state => {
  return state.navigation.applicationLanguage
}

const getReturnToHomePreviousState = state => {
  return state.navigation.returnToHomePreviousState
}
const getReturnToHomeState = state => {
  return state.navigation.returnToHomeState as ReturnToHomeState
}

const getScreenSavingState = state => {
  return state.navigation.screenSavingState as ScreenSavingState
}
const NavigationSelectors = {
  isExpirationIn5DaysExpired,
  isExpirationIn10DaysExpired,
  getApplicationLanguage,
  getReturnToHomePreviousState,
  getReturnToHomeState,
  getScreenSavingState,
}

export default NavigationSelectors
