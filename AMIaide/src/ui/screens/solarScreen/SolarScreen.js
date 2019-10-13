import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native'
import { Container, Header, Content, Title, Card, CardItem, H1, H2, H3 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import material from 'AMIaide/native-base-theme/variables/material';

import { Env } from 'src/utils/env'
import SolarView from './SolarView'
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

import moment from 'moment'
import momentFR from 'moment/locale/fr'
import { times } from 'src/utils'

//import { notifierAuthorization, notifierAdd } from 'src/utils'
//notifierAuthorization()
/*
var fr = moment().locale("fr", momentFR)
notifierAdd({
  title: "test",
  body: "body test",
  date: fr.add(15, 's').toDate().getTime()
}).then((result) => {
  console.log(result)
})*/

const BOLD = (text) => (<Text style={{fontWeight: 'bold'}}>{text}</Text>)
const BR = (<Text>{'\n'}</Text>)

const DURATION_WHEN_REFRESH_SOLAR = 60000 * 1

export default ({ me, messagesRequest }) => {

  const { username } = me

  const [date, setDate] = useState(moment())
  const [hello, setHello] = useState({
    title: 'Bonjour',
    content: ''
  })

  useEffect(() => {
    //loop()
    setHelloText(moment())
    messagesRequest({})
    startTimer()
  }, [])

  const getMessage = (date) => {
    var fr = date.locale("fr", momentFR)
    const day = fr.format("dddd Do MMMM YYYY")
    const hour = fr.format("HH:mm")
    return {
      title: `Bonjour ${username}`,
      content: <Text>nous sommes le {BR} {BOLD(day)} {BR}{BR} il est {BR}{BOLD(hour)} </Text>  
    }
  }

  const setHelloText = (date) => {
    const msg = getMessage(date)
    setHello(msg)
  }

  const onPress = () => {
    console.log("ON PRESS")
    Actions.home()
  }

  const incrementHours = () => {
    const newDate = date.add(30, 'm')
    console.log(newDate)
    //setDate(newDate)
    setHelloText(newDate)
  }
  const loop = () => {
    setInterval(function () {
      console.log("setDate")
      incrementHours()
      //loop() 
    },
      500)
  }

  const timerAction = () => {
    setHelloText(moment())
  }
  
  const startTimer = () => {
    timerIdentifier = setInterval(timerAction, DURATION_WHEN_REFRESH_SOLAR);
  }

  const dawnColor = ['#BEDDFC', '#EFEEF3', '#FEF7E4', '#FDF2D6']
  const sunColor = ['#3EA2E8', '#44BCFC', '#87CFFF', '#BEDDFC']
  const duskColor = ['#C6D9BC', '#DBCFA5', '#E7BF8E', '#DCA27F']
  const nightColor = ['#012D5B', '#19689F', '#4F94BB', '#A7BCBC'] 
  let color = []
  const time = times(date)

  let solarIcon = require('src/assets/images/sun.png')
  let moonIcon = require('src/assets/images/moon.png')
  switch (time) {
    case "DAWN":
      color = dawnColor
      solarIcon = require('src/assets/images/sun_dawn.png')
      moonIcon = null;
      break
    case "SUN":
      color = sunColor
      moonIcon = null;
      break;
    case "DUSK":
      color = duskColor
      solarIcon = require('src/assets/images/sun_dusk.png')
      moonIcon = null;
      break;
    case "NIGHT":
      color = nightColor
      solarIcon= null
      break;
    default:
      color = sunColor
      break;
  }

  const textColor = time == "DAWN" ? '#848484' : '#fff'

  return (
    <Container style={{ backgroundColor: material.brandPrimary }}>
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }} end={{ x: 0.0, y: 1.0 }}
        colors={color}
        style={{ flex: 1 }}>
        <H1 style={ {color: textColor, ...styles.title} }>{BOLD(hello.title)}</H1>
        <View style={styles.content}>
          <H1 style={{ textAlign: 'center', color: textColor }}>{hello.content}</H1>
        </View>
        <SolarView
          date={date}
          onPress={onPress}
          solarIcon={solarIcon}
          moonIcon={moonIcon} />
      </LinearGradient>
    </Container>
  );
}
/**
 * Styles
 */
const styles = {

  title: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    textAlign: 'center'
  },

  content: {
    position: 'absolute',
    top: 200,
    left: 230,
    right: 230,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },

  footer: {
    position: 'absolute',
    left: 230,
    right: 230,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }

}