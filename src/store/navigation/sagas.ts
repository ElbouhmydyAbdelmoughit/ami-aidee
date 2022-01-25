import { takeLatest, select, call } from 'redux-saga/effects'
import { types } from './actions'
import NavigationSelectors from './selectors'
import { changeLanguage } from 'core/i18n'
import { setLocale } from 'core/moment'

function* setApplicationLanguage({ lang }) {
  changeLanguage(lang)
  setLocale(lang)
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
