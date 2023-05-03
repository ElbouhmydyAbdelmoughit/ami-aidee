import React, { useEffect } from 'react'

import { Card, Heading } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { StyleSheet, View } from 'react-native'
import { AuthentForm } from 'ui/components'
import Orientation from 'react-native-orientation'

import { Translations } from 'core/i18n'
import LangSelector from './LangSelector'

export default ({ loginRequest, onRefresh }) => {
  const onValidate = form => {
    const { username, password } = form
    loginRequest(username, password)
  }

  useEffect(() => {
    Orientation.lockToPortrait()
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
      <View style={styles.content}>
        <Heading size="xl" style={styles.title}>
          {'A.M.I'}
        </Heading>
        <LangSelector onRefresh={onRefresh} />
        <Card style={{ width: '60%', marginTop: 16, backgroundColor: 'white' }}>
          <Heading size="md" style={styles.headerTitle}>
            {Translations.common.to_login}
          </Heading>
          <View style={{ flexDirection: 'row' }}>
            <AuthentForm style={{ flex: 1 }} onValidate={onValidate} />
          </View>
        </Card>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  title: {
    marginTop: 16,
    color: '#fff',
    fontFamily: 'Roboto',
    textAlign: 'center',
  },

  header: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    padding: 10,
    textAlign: 'center',
    color: '#848484',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
})
