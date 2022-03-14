import { createAction } from '../../utils'

export type ReturnToHomeState = 'idle' | 'after_2_min' | 'after_1_min' | 'busy'

export type ScreenSavingState = 'idle' | 'home' | 'sleep'

export const types = {
  EXPIRATION_IN_10DAYS_WARNING_DISPLAYED:
    'EXPIRATION_IN_10DAYS_WARNING_DISPLAYED',
  EXPIRATION_IN_5DAYS_WARNING_DISPLAYED:
    'EXPIRATION_IN_5DAYS_WARNING_DISPLAYED',
  SET_APPLICATION_LANGUAGE: 'SET_APPLICATION_LANGUAGE',
  INITIALIZE_APPLICATION_LANGUAGE: 'INITIALIZE_APPLICATION_LANGUAGE',
  START_SLEEP_SCREEN_TIMER: 'START_SLEEP_SCREEN_TIMER',
  START_WAKE_UP_TIMER: 'START_WAKE_UP_TIMER',
  SCREEN_TOUCHED: 'SCREEN_TOUCHED',
  CHANGE_RETURN_TO_HOME_STATE: 'CHANGE_RETURN_TO_HOME_STATE',
  EXIT_BUSY_STATE: 'EXIT_BUSY_STATE',
  ENTER_BUSY_STATE: 'ENTER_BUSY_STATE',
  CHANGE_SCREEN_SAVING_STATE: 'CHANGE_SCREEN_SAVING_STATE',
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
  startSleepScreenTimer() {
    return createAction(types.START_SLEEP_SCREEN_TIMER)
  },
  startWakeUpTimer() {
    return createAction(types.START_WAKE_UP_TIMER)
  },
  screenTouched() {
    return createAction(types.SCREEN_TOUCHED)
  },
  changeReturnToHomeState(newState: ReturnToHomeState) {
    return createAction(types.CHANGE_RETURN_TO_HOME_STATE, { newState })
  },
  changeScreenSavingState(newState: ScreenSavingState) {
    console.log('NavigationSagas: change screen saving state', newState)
    return createAction(types.CHANGE_SCREEN_SAVING_STATE, { newState })
  },
  enterBusyState() {
    return createAction(types.ENTER_BUSY_STATE)
  },
  exitBusyState() {
    return createAction(types.EXIT_BUSY_STATE)
  },
}

export default NavigationActions
