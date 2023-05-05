import { changeLanguage } from 'core/i18n'
import { setLocale } from 'core/moment'
import type { Locale } from 'core/types'
import { call,select, takeLatest } from 'redux-saga/effects'

import { types } from './actions'
import NavigationSelectors from './selectors'

function* setApplicationLanguage({ lang }: { lang: Locale }) {
  changeLanguage(lang || 'en')
  setLocale(lang || 'en')
}

function* initializeApplicationLanguage() {
  const appLang = yield select(NavigationSelectors.getApplicationLanguage)
  yield call(setApplicationLanguage, { lang: appLang })
}

export default [
  takeLatest(types.SET_APPLICATION_LANGUAGE, setApplicationLanguage),
  takeLatest(
    types.INITIALIZE_APPLICATION_LANGUAGE,
    initializeApplicationLanguage
  ),
]
