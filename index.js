/* eslint-disable import/first */
import * as Sentry from '@sentry/react-native'
import './src/core/i18n'

Sentry.init({
  dsn:
    'https://bc5993540c3f493bb71bf2430e3640fc@o374533.ingest.sentry.io/5197127',
  integrations: integrations => {
    // integrations will be all default integrations
    return integrations.filter(
      integration => integration.name !== 'Breadcrumbs'
    )
  },
})

import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'

console.disableYellowBox = true

AppRegistry.registerComponent(appName, () => App)
