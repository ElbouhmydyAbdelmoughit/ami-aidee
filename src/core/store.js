//import { addTranslationForLanguage, initialize, localizeReducer } from 'react-localize-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { loadState, saveState } from 'src/utils/storage'
import { languages, strings } from '../assets'
import appReducers, { rootSaga } from '../redux'
import { createLogger } from 'redux-logger'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    // In message there are "view" state like message_alerted,
    // which is not ideal for persist
    'message',
    'user',
  ],
  timeout: null,
}

const logger = createLogger({
  // ...options
})

const sagaMiddleware = createSagaMiddleware()

// Retrieves state from local storage
const persistedState = loadState()

// Configure store middleware
const middleware = [
  // Info: Apply sagaMiddleware in first !
  applyMiddleware(logger),
  applyMiddleware(sagaMiddleware),
].concat(
  process.env.NODE_ENV === 'development'
    ? [
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
          ? window.__REDUX_DEVTOOLS_EXTENSION__()
          : compose,
      ]
    : []
)

// Create Persist Reducer
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    //locale: localizeReducer,
    ...appReducers,
  })
)

// Create store
const store = createStore(
  persistedReducer,
  persistedState,
  compose(...middleware)
)

// Each sagas are isolated
// This ensure that the sagas will not be canceled if one failed
// (Be aware that should be a source of performance leak)
rootSaga.forEach(saga =>
  sagaMiddleware.run(function*() {
    yield saga
  })
)

// Set up internationalization
/*store.dispatch(initialize({
  languages: languages, translation: strings.french, options: {
    renderInnerHtml: true,
    defaultLanguage: 'fr',
  },
}));
store.dispatch(addTranslationForLanguage(strings.french, 'fr'));
*/
// Save state when changes occurred
store.subscribe(() => {
  const { auth, user } = store.getState()
  saveState({ auth, user })
})

const persistor = persistStore(store)

export default {
  store,
  persistor,
}
