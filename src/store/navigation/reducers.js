import { getLocales } from 'react-native-localize'
import { createReducer } from 'reduxsauce'
import { types } from './actions'

const getInitialLang = () => {
  const deviceLang = getLocales()[0].languageCode.toLowerCase()
  if (['en', 'de', 'fr'].some(lng => lng === deviceLang)) {
    return deviceLang
  }
  return 'en'
}
const initialState = {
  expirationIn5DaysDisplayed: false,
  expirationIn10DaysDisplayed: false,
  applicationLanguage: getInitialLang(),
}

const expirationIn5DaysDisplayed = (state = initialState) => ({
  ...state,
  expirationIn5DaysDisplayed: true,
})

const expirationIn10DaysDisplayed = (state = initialState) => ({
  ...state,
  expirationIn10DaysDisplayed: true,
})

const setApplicationLanguage = (state = initialState, action) => ({
  ...state,
  applicationLanguage: action.lang,
})

export default createReducer(initialState, {
  [types.EXPIRATION_IN_5DAYS_WARNING_DISPLAYED]: expirationIn5DaysDisplayed,
  [types.EXPIRATION_IN_10DAYS_WARNING_DISPLAYED]: expirationIn10DaysDisplayed,
  [types.SET_APPLICATION_LANGUAGE]: setApplicationLanguage,
})
