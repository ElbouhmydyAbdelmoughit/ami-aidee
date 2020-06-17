import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import { Container, H1 } from 'native-base'
import material from 'AMIaide/native-base-theme/variables/material'
import { Button, TouchableRipple } from 'react-native-paper'

import { Actions } from 'react-native-router-flux'
import LinearGradient from 'react-native-linear-gradient'
import { Timer } from 'src/ui/components'
import AccountChecker from 'src/ui/business/AccountChecker'
import moment from 'moment'
import momentFR from 'moment/locale/fr'
import { times } from 'src/utils'
import TimerInitiator from 'src/ui/business/TimerInitiator'
import MessageAlertManager from 'src/ui/business/MessageAlertManager'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import SolarView from './SolarView'
// notifierAuthorization()
/*
var fr = moment().locale("fr", momentFR)
notifierAdd({
  title: "test",
  body: "body test",
  date: fr.add(15, 's').toDate().getTime()
}).then((result) => {
  console.log(result)
})
*/

const BOLD = text => <Text style={{ fontWeight: 'bold' }}>{text}</Text>
const BR = <Text>{'\n'}</Text>

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
  },

  content: {
    position: 'absolute',
    top: 200,
    left: 230,
    right: 230,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  footer: {
    position: 'absolute',
    left: 230,
    right: 230,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
}

const SolarScreen = ({
  minuteTick,
  messagesRequest,
  helpedUserRequest,
  displayName,
  helpedUserId,
  helpedUser,
}) => {
  const [fadeIn, setFadeIn] = useState(0)
  const [date, setDate] = useState(moment())
  const [hello, setHello] = useState({
    title: 'Bonjour',
    content: '',
    footer: '',
  })

  const getMessage = dateInput => {
    const time = times(dateInput, helpedUser)
    const fr = dateInput.locale('fr', momentFR)
    const day = fr.format('dddd Do MMMM YYYY')
    const hour = fr.format('HH:mm')
    if (time === 'NIGHT') {
      return {
        title: "C'est la nuit",
        content: (
          <Text>
            {BR}il est {BOLD(hour)}
            {BR}Dormir est nécessaire pour que ton cerveau répare ton corps.
          </Text>
        ),
        footer: <Text>Retourne dans ton lit</Text>,
      }
    }
    return {
      title: `Bonjour ${displayName}`,
      content: (
        <Text>
          nous sommes le {BR} {BOLD(day)} {BR}
          {BR} il est {BR}
          {BOLD(hour)}{' '}
        </Text>
      ),
    }
  }

  const setHelloText = dateInput => {
    const msg = getMessage(dateInput)
    setHello(msg)
  }

  useEffect(() => {
    //loop()
    setHelloText(date)
  }, [])

  useEffect(() => {
    if (helpedUserId) {
      messagesRequest(helpedUserId)
      helpedUserRequest(helpedUserId)
    }
  }, [helpedUserId])

  useEffect(() => {
    setHelloText(minuteTick)
    setDate(minuteTick)
  }, [minuteTick])

  const startBlinking = () => {
    let opacity = 0
    let add = true
    const interval = setInterval(() => {
      setFadeIn(opacity)
      if (add) opacity += 0.1
      else opacity -= 0.1

      add = !(opacity === 1)
    }, 100)

    const tst = setTimeout(() => {
      //blinkInter.in
      clearImmediate(interval)
      setFadeIn(0)
    }, 10000)
  }

  const onPress = () => {
    const time = times(date, helpedUser)
    if (time === 'NIGHT') {
      startBlinking()
    } else {
      Actions.home()
    }
  }

  const dawnColor = ['#BEDDFC', '#EFEEF3', '#FEF7E4', '#FDF2D6']
  const sunColor = ['#3EA2E8', '#44BCFC', '#87CFFF', '#BEDDFC']
  const duskColor = ['#C6D9BC', '#DBCFA5', '#E7BF8E', '#DCA27F']
  const nightColor = ['#012D5B', '#19689F', '#4F94BB', '#A7BCBC']
  let color = []
  const time = times(date, helpedUser)

  let solarIcon = require('src/assets/images/sun.png')
  let moonIcon = require('src/assets/images/moon.png')
  switch (time) {
    case 'DAWN':
      color = dawnColor
      solarIcon = require('src/assets/images/sun_dawn.png')
      moonIcon = null
      break
    case 'SUN':
      color = sunColor
      moonIcon = null
      break
    case 'DUSK':
      color = duskColor
      solarIcon = require('src/assets/images/sun_dusk.png')
      moonIcon = null
      break
    case 'NIGHT':
      color = nightColor
      solarIcon = null
      break
    default:
      color = sunColor
      break
  }

  const textColor = time == 'DAWN' ? '#848484' : '#fff'

  return (
    <Container style={{ backgroundColor: material.brandPrimary }}>
      <TimerInitiator />
      <MessageAlertManager />
      <Timer mode={'awake'} />
      <AccountChecker />
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 0.0, y: 1.0 }}
        colors={color}
        style={{ flex: 1 }}
      >
        <H1 style={{ color: textColor, ...styles.title }}>
          {BOLD(hello.title)}
        </H1>
        <View style={styles.content}>
          <H1 style={{ textAlign: 'center', color: textColor }}>
            {hello.content}
          </H1>
          {BR}
          <H1
            style={{ textAlign: 'center', color: textColor, opacity: fadeIn }}
          >
            {hello.footer}
          </H1>
        </View>
        <SolarView
          date={date}
          onPress={onPress}
          solarIcon={solarIcon}
          times={times(date, helpedUser)}
          moonIcon={moonIcon}
          helpedUser={helpedUser}
        />
      </LinearGradient>
      <View
        style={{
          position: 'absolute',
          right: 32,
          top: 32,
        }}
      >
        <TouchableRipple
          onPress={() => {
            Actions.replace('contactsList')
          }}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 4,
              borderColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: 8,
              padding: 20,
              minWidth: 200,
              minHeight: 170,
            }}
          >
            <Icon name="account-heart" size={64} color={'white'} />
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 24,
              }}
            >
              Coucou
            </Text>
          </View>
        </TouchableRipple>
      </View>
    </Container>
  )
}
export default SolarScreen
