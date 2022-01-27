import React from 'react'

import { Image } from 'react-native'
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Title,
  H1,
  H2,
  H3,
  Left,
  Right,
} from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { Col, Row, Grid } from 'react-native-easy-grid'

import { AuthentForm } from 'ui/components'
import AppStyles from 'src/config/styles'

import moment from 'core/moment'
import { Translations } from 'core/i18n'
import LangSelector from './LangSelector'

export default ({ loginRequest, onRefresh }) => {
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
          <LangSelector onRefresh={onRefresh} />
          <Card style={{ width: '60%', marginTop: 16 }}>
            <CardItem header style={styles.header}>
              <H3 style={styles.headerTitle}>{Translations.common.to_login}</H3>
            </CardItem>
            <CardItem body>
              <AuthentForm
                style={{ flex: 1, paddingRight: 30, paddingLeft: 30 }}
                onValidate={onValidate}
              />
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
