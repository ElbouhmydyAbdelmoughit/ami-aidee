const isExpirationIn5DaysExpired = state => {
  return state.navigation.expirationIn5DaysDisplayed
}

const isExpirationIn10DaysExpired = state => {
  return state.navigation.expirationIn10DaysDisplayed
}

const getApplicationLanguage = state => {
  return state.navigation.applicationLanguage
}

const NavigationSelectors = {
  isExpirationIn5DaysExpired,
  isExpirationIn10DaysExpired,
  getApplicationLanguage,
}

export default NavigationSelectors
