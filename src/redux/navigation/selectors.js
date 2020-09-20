const isExpirationIn5DaysExpired = state => {
  return state.navigation.expirationIn5DaysDisplayed
}

const isExpirationIn10DaysExpired = state => {
  return state.navigation.expirationIn10DaysDisplayed
}

const NavigationSelectors = {
  isExpirationIn5DaysExpired,
  isExpirationIn10DaysExpired,
}

export default NavigationSelectors
