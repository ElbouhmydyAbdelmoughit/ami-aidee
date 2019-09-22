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

const BOLD = (text) => (<Text style={{fontWeight: 'bold'}}>{text}</Text>)
const BR = (<Text>{'\n'}</Text>)

export default ({ me }) => {

  const { username } = me

  const [date, setDate] = useState(moment())
  const [hello, setHello] = useState({
    title: 'Bonjour',
    content: ''
  })

  useEffect(() => {
    //loop()
    setHelloText(moment())
  }, [])

  const getMessage = (date) => {
    var fr = date.locale("fr", momentFR)
    const day = fr.format("dddd, Do MMMM YYYY")
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
      break
    case "SUN":
      color = sunColor
      break;
    case "DUSK":
      color = duskColor
      solarIcon = require('src/assets/images/sun_dusk.png')
      break;
    case "NIGHT":
      color = nightColor
      solarIcon= null
      break;
    default:
      color = sunColor
      break;
  }

  return (
    <Container style={{ backgroundColor: material.brandPrimary }}>
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }} end={{ x: 0.0, y: 1.0 }}
        colors={color}
        style={{ flex: 1 }}>
        <H1 style={styles.title}>{BOLD(hello.title)}</H1>
        <View style={styles.content}>
          <H1 style={{ textAlign: 'center', color: 'white' }}>{hello.content}</H1>
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
    textAlign: 'center',
    color: 'white'
  },

  content: {
    position: 'absolute',
    top: 150,
    left: 230,
    right: 230,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white'
  }

}