/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react'
import { StyleProvider, Root } from 'native-base'
import { Provider as PaperProvider } from 'react-native-paper'

import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'
import Orientation from 'react-native-orientation'
import { Core } from 'src/core'

import { Loader } from 'src/ui/components'

import AppRouter from './AppRouter'
import getTheme from './native-base-theme/components'
import material from './native-base-theme/variables/material'

const { store, persistor } = Core

const App = () => {
  useEffect(() => {
    Orientation.lockToLandscape()
    return () => {}
  }, [])
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StyleProvider style={getTheme(material)}>
          <PaperProvider>
            <>
              <Loader />
              <Root>
                <AppRouter />
              </Root>
            </>
          </PaperProvider>
        </StyleProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
