import React from 'react';

import { Image } from 'react-native'
import { Container, Header, Content, Card, CardItem, Body, Title, H1, H2, H3, Left, Right } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { notifierAuthorization, notifierAdd } from 'src/utils'

import { AuthentForm } from 'src/ui/components'
import AppStyles from 'src/config/styles';

import moment from 'moment'
import momentFR from 'moment/locale/fr'
var fr = moment().locale("fr", momentFR)

notifierAuthorization()
notifierAdd({
  title: "test",
  body: "body test",
  date: fr.add(2, 'm').toDate().getTime()
}).then((result) => {
  console.log(result)
})

export default ({ loginRequest }) => {
  const notifDate = moment().format('YYYY-MM-dd hh:mm')
  console.log(notifDate)

  const onValidate = (form) => {
    console.log(form)
    const { username, password } = form
    loginRequest(username, password)
  }

  const color = ['#3FEDFF', '#8772FF']
  return (
    <Container>
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 1.0 }}
        colors={color}
        style={{ flex: 1 }}>
        <Content contentContainerStyle={styles.content}>

        <H1 style={styles.title}>{"A.M.I"}</H1>
          <Card style={{width: '40%'}}>
            <CardItem header style={styles.header}>
              <Image style={{ width: 50, height: 50 }} source={require('src/assets/images/user.png')} />
              <H3 style={styles.headerTitle}>Se connecter</H3>
            </CardItem>
            <CardItem body>
              <AuthentForm style={{ flex: 1, paddingRight: 30, paddingLeft: 30 }}
                form={{ username: "didier@gmail.com", password: "testounet" }}
                onValidate={onValidate} />
            </CardItem>
          </Card>
        </Content>
      </LinearGradient>
    </Container>
  );
}

const styles = {

  title: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontSize: 80,
    position: 'absolute',
    textAlign:'center',
    paddingTop: 50,
    height: 80,
    top: 25,
    left: 0,
    right: 0,
  },

  header: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  headerTitle: {
    padding: 10,
    color: '#848484'
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  }
}