import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Translations } from 'core/i18n'
import { Card, Heading } from 'native-base'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Orientation from 'react-native-orientation'
import { AuthentForm } from 'ui/components'

import LangSelector from './LangSelector'
import DeviceInfo from 'react-native-device-info'

// Create a client
const queryClient = new QueryClient()

const LoginScreen = ({ loginRequest, onRefresh }) => {
  const onValidate = form => {
    const { username, password, invalid } = form
    loginRequest(username, password, invalid)
  }

  useEffect(() => {
    if (DeviceInfo.isTablet()) { 
      Orientation.lockToLandscape()
    } else {
      Orientation.lockToPortrait()
    }
    return () => {}
  }, [])

  const color = ['#3FEDFF', '#8772FF']
  return (
    <LinearGradient
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 1.0, y: 1.0 }}
      colors={color}
      style={{ flex: 1 }}
    >
      <QueryClientProvider client={queryClient}>
        <View style={styles.content}>
          <Heading size={'xl'} style={styles.title}>
            A.M.I
          </Heading>
          <LangSelector onRefresh={onRefresh} />
          <Card
            style={{ width: '60%', marginTop: 16, backgroundColor: 'white' }}
          >
            <Heading size={'md'} style={styles.headerTitle}>
              {Translations.common.to_login}
            </Heading>
            <View style={{ flexDirection: 'row' }}>
              <AuthentForm style={{ flex: 1 }} onValidate={onValidate} />
            </View>
          </Card>
        </View>
      </QueryClientProvider>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginTop: 16,
    fontFamily: 'Roboto',
    color: '#fff',
  },
  headerTitle: {
    textAlign: 'center',
    padding: 10,
    color: '#848484',
  },
  content: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
})

export default LoginScreen
