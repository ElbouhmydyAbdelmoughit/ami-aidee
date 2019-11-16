/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import AppRouter from './AppRouter';
import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

import { Provider } from 'react-redux'

import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react'

import {Core} from 'src/core'

import { Loader, Timer } from 'src/ui/components'

import AppStyles from 'src/config/styles'

console.log(Core)
const { store, persistor } = Core

console.log(persistor)
console.log(store)
const App = () => {
    return (
        <Provider store={store} >
            <PersistGate loading={null} persistor={persistor}>
                <StyleProvider style={getTheme(material)} >
                    <>
                        <Loader />
                        <AppRouter />
                    </>
                </StyleProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;