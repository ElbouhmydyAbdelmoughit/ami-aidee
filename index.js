import 'react-native-gesture-handler'
import './src/core/i18n'

import * as Sentry from '@sentry/react-native'
import { AppRegistry } from 'react-native'

import App from './App'
import { name as appName } from './app.json'

Sentry.init({
  dsn:
    'https://f8103101b4a942cc92ef98cded6ad5f4@o4504782758805504.ingest.sentry.io/4504826261405696',
  attachScreenshot: !__DEV__,
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  environment: __DEV__ ? 'development' : 'production',
  integrations: integrations => {
    if (!__DEV__) {
      return integrations
    }
    return integrations.filter(
      integration => integration.name !== 'Breadcrumbs'
    )
  },
})

AppRegistry.registerComponent(appName, () => Sentry.wrap(App))
