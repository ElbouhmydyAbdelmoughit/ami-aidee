import {
  takeLatest,
  select,
  call,
  put,
  cancelled,
  cancel,
  fork,
  take,
  race,
} from 'redux-saga/effects'
import NavigationActions, { types } from './actions'
import NavigationSelectors from './selectors'
import { changeLanguage } from 'core/i18n'
import { setLocale } from 'core/moment'
import { delay } from 'redux-saga'
import {
  RETURN_TO_HOME_DURATION,
  SCREENSAVING_DURATION,
  WAKEUP_DURATION,
} from 'utils/constant'
import { Actions } from '@ami-app/react-native-router-flux'
import { Locale } from 'core/types'
import { types as userActivitiesTypes } from '../user-activities/actions'
import { tasks } from 'googleapis/build/src/apis/tasks'
import logger from 'core/logger'
function* setApplicationLanguage({ lang }: { lang: Locale }) {
  changeLanguage(lang || 'en')
  setLocale(lang || 'en')
}

function* initializeApplicationLanguage() {
  const appLang = yield select(NavigationSelectors.getApplicationLanguage)
  yield call(setApplicationLanguage, { lang: appLang })
}

function* backToRootTimer(duration: number) {
  try {
    logger.debug(' waiting for back to root duration')
    yield delay(duration)
    logger.debug(' redirecting to root screen')
    yield call(Actions.accueil.bind(Actions))
  } finally {
    if (yield cancelled()) {
      // let's relaunch the timer
      logger.debug(' idle mode, resume timer')
      yield put(NavigationActions.changeReturnToHomeState('after_1_min'))
    }
  }
}

function* sleepScreenTimer() {
  logger.debug(' waiting for sleep screen duration')
  yield delay(SCREENSAVING_DURATION)
  logger.debug(' redirecting to sleep screen')
  yield call(Actions.sleep.bind(Actions))
  yield delay(WAKEUP_DURATION)
  logger.debug(' redirecting to home screen')
  yield call(Actions.root.bind(Actions))
}

function* redirectToSleepScreenTimerTask() {
  let memoizedRaceChangeScreenSavingState = false
  while (true) {
    logger.debug(' redirectToSleepScreen/waiting for task')
    if (!memoizedRaceChangeScreenSavingState) {
      yield take(types.CHANGE_SCREEN_SAVING_STATE)
    }
    let screenSavingState = yield select(
      NavigationSelectors.getScreenSavingState
    )
    logger.debug('redirectToSleepScreen/screenSavingState', screenSavingState)

    if (screenSavingState === 'home') {
      logger.debug(' redirectToSleepScreen/launch sleep timer')
      yield
      const sleepScreenTask = yield fork(sleepScreenTimer)

      const { changeScreenSavingState } = yield race({
        screenTouched: take(types.SCREEN_TOUCHED),
        activityLogRequest: take(userActivitiesTypes.ACTIVITY_LOG_REQUEST),
        changeScreenSavingState: take(types.CHANGE_SCREEN_SAVING_STATE),
        enterBusyState: take(types.ENTER_BUSY_STATE),
      })
      if (changeScreenSavingState) {
        memoizedRaceChangeScreenSavingState = true
      } else {
        logger.debug('cancelling return to sleep')
        yield cancel(sleepScreenTask)
        memoizedRaceChangeScreenSavingState = false
      }
    }
  }
}

function* redirectToRootTimerTask() {
  while (true) {
    yield take(types.CHANGE_RETURN_TO_HOME_STATE)
    let returnToHomeState = yield select(
      NavigationSelectors.getReturnToHomeState
    )

    if (
      returnToHomeState !== 'after_1_min' &&
      returnToHomeState !== 'after_2_min'
    ) {
      continue
    }

    logger.debug(' launch back to root timer')
    // starts the task in the background
    const returnToHomeTask = yield fork(
      backToRootTimer,
      returnToHomeState === 'after_1_min'
        ? RETURN_TO_HOME_DURATION
        : 2 * RETURN_TO_HOME_DURATION
    )

    const { screenTouched, activityLogRequest, enterBusyState } = yield race({
      screenTouched: take(types.SCREEN_TOUCHED),
      activityLogRequest: take(userActivitiesTypes.ACTIVITY_LOG_REQUEST),
      enterBusyState: take(types.ENTER_BUSY_STATE),
    })

    yield cancel(returnToHomeTask)
  }
}

function* exitBusyState() {
  const prevReturnToHomeState = yield select(
    NavigationSelectors.getReturnToHomePreviousState
  )
  yield put(NavigationActions.changeReturnToHomeState(prevReturnToHomeState))
  yield put(NavigationActions.changeScreenSavingState)
}

export default [
  takeLatest(types.SET_APPLICATION_LANGUAGE, setApplicationLanguage),
  takeLatest(
    types.INITIALIZE_APPLICATION_LANGUAGE,
    initializeApplicationLanguage
  ),
  takeLatest(types.EXIT_BUSY_STATE, exitBusyState),
  call(redirectToRootTimerTask),
  call(redirectToSleepScreenTimerTask),
]
