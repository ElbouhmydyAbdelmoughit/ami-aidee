import { Locale, ReduxAction } from 'core/types'
import { getLocales } from 'react-native-localize'
import { createReducer } from 'reduxsauce'
import { ReturnToHomeState, types, ScreenSavingState } from './actions'

const getInitialLang = (): Locale => {
  const deviceLang = getLocales()[0].languageCode.toLowerCase()
  if (['en', 'de', 'fr'].some(lng => lng === deviceLang)) {
    return deviceLang as Locale
  }
  return 'en'
}

export type NavigationState = {
  expirationIn5DaysDisplayed: boolean
  expirationIn10DaysDisplayed: boolean
  applicationLanguage: Locale
  returnToHomePreviousState: ReturnToHomeState
  returnToHomeState: ReturnToHomeState
  screenSavingState: ScreenSavingState
}
const initialState: NavigationState = {
  expirationIn5DaysDisplayed: false,
  expirationIn10DaysDisplayed: false,
  applicationLanguage: getInitialLang(),
  returnToHomePreviousState: 'idle',
  returnToHomeState: 'idle',
  screenSavingState: 'idle',
}

type NavigationAction<A = undefined> = ReduxAction<NavigationState, A>

const expirationIn5DaysDisplayed = (state = initialState) => ({
  ...state,
  expirationIn5DaysDisplayed: true,
})

const expirationIn10DaysDisplayed = (state = initialState) => ({
  ...state,
  expirationIn10DaysDisplayed: true,
})

const setApplicationLanguage: NavigationAction<{ lang: Locale }> = (
  state = initialState,
  action
) => ({
  ...state,
  applicationLanguage: action.lang,
})

const changeReturnToHomeState: NavigationAction<{
  newState: ReturnToHomeState
}> = (state = initialState, { newState }) => ({
  ...state,
  returnToHomePreviousState: state.returnToHomeState,
  returnToHomeState: newState,
})

const changeScreenSavingState: NavigationAction<{
  newState: ScreenSavingState
}> = (state = initialState, action) => ({
  ...state,
  screenSavingState: action.newState,
})

export default createReducer(initialState, {
  [types.EXPIRATION_IN_5DAYS_WARNING_DISPLAYED]: expirationIn5DaysDisplayed,
  [types.EXPIRATION_IN_10DAYS_WARNING_DISPLAYED]: expirationIn10DaysDisplayed,
  [types.SET_APPLICATION_LANGUAGE]: setApplicationLanguage,
  [types.CHANGE_RETURN_TO_HOME_STATE]: changeReturnToHomeState,
  [types.CHANGE_SCREEN_SAVING_STATE]: changeScreenSavingState,
})
