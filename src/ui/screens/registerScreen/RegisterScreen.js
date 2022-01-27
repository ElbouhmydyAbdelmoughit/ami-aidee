import React from 'react'

import { Image, View } from 'react-native'
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Title,
  H2,
  H3,
  Left,
  Right,
} from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { Col, Row, Grid } from 'react-native-easy-grid'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { RegisterForm } from 'src/ui/components'
import AppStyles from 'src/config/styles'

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
    <Container>
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        colors={color}
        style={{ flex: 1 }}
      >
        <Content contentContainerStyle={styles.content}>
          <H2 style={styles.title}>{'A.M.I'}</H2>
          <Card style={{ width: '60%', marginTop: 16 }}>
            <CardItem header style={styles.header}>
              <Icon name="account-plus" size={50} color={'#BBB'} />
              <H3 style={styles.headerTitle}>
                {Translations.common.to_signup}
              </H3>
            </CardItem>
            <CardItem body>
              <RegisterForm step={step} />
            </CardItem>
          </Card>
        </Content>
      </LinearGradient>
    </Container>
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
