import React from 'react'

import { Card, Heading } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { View } from 'react-native'
import { RegisterForm } from 'ui/components'

import moment from 'core/moment'
import { Translations } from 'core/i18n'

const RegisterScreen = ({ loginRequest, step }) => {
  const notifDate = moment().format('YYYY-MM-dd hh:mm')
  console.log(notifDate)

  const onValidate = form => {
    console.log(form)
    const { username, password } = form
    loginRequest(username, password)
  }

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
        <Card style={{ width: '60%', marginTop: 16, backgroundColor: 'white' }}>
          <View style={styles.header}>
            <Icon name="account-plus" size={50} color={'#BBB'} />
            <Heading style={styles.headerTitle}>
              {Translations.common.to_signup}
            </Heading>
          </View>
          <View>
            <RegisterForm step={step} />
          </View>
        </Card>
      </View>
    </LinearGradient>
  )
}

const styles = {
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
    color: '#848484',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}

export default RegisterScreen
