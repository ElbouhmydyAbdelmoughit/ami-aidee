/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { extendTheme, NativeBaseProvider } from 'native-base'
import { Provider as PaperProvider } from 'react-native-paper'

import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'

import { Core } from 'core'

import { Loader } from 'ui/components'

import AppRouter from './AppRouter'

const { store, persistor } = Core

const theme = extendTheme({
  colors: {
    // Add new color

    primary: {
      50: '#E3F2F9',
      100: '#C5E4F3',
      200: '#A2D4EC',
      300: '#7AC1E4',
      400: '#47A9DA',
      500: '#0088CC',
      600: '#007AB8',
      700: '#006BA1',
      800: '#005885',
      text: 'white',
      900: '#003F5E',
    },
    // Redefinig only one shade, rest of the color will remain same.
    amber: {
      400: '#d97706',
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    // initialColorMode: 'dark',
  },
})
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider theme={theme}>
          <PaperProvider>
            <>
              <Loader />
              <AppRouter />
            </>
          </PaperProvider>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
