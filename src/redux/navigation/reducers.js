import { createReducer } from 'reduxsauce'
import { types } from './actions'

const initialState = {
  expirationIn5DaysDisplayed: false,
  expirationIn10DaysDisplayed: false,
}

const expirationIn5DaysDisplayed = (state = initialState) => ({
  ...state,
  expirationIn5DaysDisplayed: true,
})

const expirationIn10DaysDisplayed = (state = initialState) => ({
  ...state,
  expirationIn10DaysDisplayed: true,
})

export default createReducer(initialState, {
  [types.EXPIRATION_IN_5DAYS_WARNING_DISPLAYED]: expirationIn5DaysDisplayed,
  [types.EXPIRATION_IN_10DAYS_WARNING_DISPLAYED]: expirationIn10DaysDisplayed,
})
