import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Container, Heading, Text } from 'native-base'
import material from 'AMIaide/native-base-theme/variables/material'

import { Actions } from 'react-native-router-flux'
import LinearGradient from 'react-native-linear-gradient'
import AccountChecker from 'src/ui/business/AccountChecker'
import moment from 'core/moment'
import { times } from 'utils'
import TimerInitiator from 'ui/business/TimerInitiator'
import MessageAlertManager from 'ui/business/MessageAlertManager'

import SolarView from './SolarView'
import ContactButton from './ContactButton'
import { Trans, useTranslation } from 'react-i18next'
import colorUtils from 'utils/colors'
import { withNavigationFocus } from 'react-navigation'
import SleepTimer from 'ui/components/SleepTimer'

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

let instantMessagesFetched = false

const SolarScreen = ({
  minuteTick,
  messagesRequest,
  instantMessagesRequest,
  helpedUserRequest,
  displayName,
  helpedUserId,
  helpedUser,
  auxiliaries,
  hasNewMessage,
}) => {
  const [fadeIn, setFadeIn] = useState(0)
  const [date, setDate] = useState(moment())
  const [hello, setHello] = useState({
    title: 'Bonjour',
    content: '',
    footer: '',
  })

  const { t } = useTranslation()

  const getMessage = dateInput => {
    const time = times(dateInput, helpedUser)
    const day = moment().format('dddd Do MMMM YYYY')
    const hour = moment().format('HH:mm')
    if (time === 'NIGHT') {
      return {
        title: t('screen.solar.nighttime_title', "C'est la nuit"),
        content: (
          <Trans i18nKey="screen.solar.nighttime_description">
            <Heading size="xl" style={{ color: 'white', fontSize: 30 }}>
              il est{' '}
              <Text style={{ fontWeight: 'bold' }}>{{ hour: hour }}</Text>
              <Text>{'\n'}</Text>Dormir est nécessaire pour que ton cerveau
              répare ton corps.
            </Heading>
          </Trans>
        ),
        footer: (
          <Text>
            {t('screen.solar.nighttime_footer', 'Retourne dans ton lit')}
          </Text>
        ),
      }
    }
    return {
      title: t('screen.solar.daytime_title', {
        defaultValue: 'Bonjour {{name}}',
        name: displayName,
      }),
      content: (
        <Trans i18nKey="screen.solar.daytime_description">
          <Heading size="xl" style={{ color: 'white', fontSize: 30 }}>
            nous sommes le <Text>{'\n'}</Text>{' '}
            <Text style={{ fontWeight: 'bold' }}>{{ day }}</Text>{' '}
            <Text>{'\n'}</Text>
            <Text>{'\n'}</Text> il est <Text>{'\n'}</Text>
            <Text style={{ fontWeight: 'bold' }}>{{ hour }}</Text>{' '}
          </Heading>
        </Trans>
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
    if (auxiliaries && auxiliaries.length > 0 && !instantMessagesFetched) {
      instantMessagesRequest(auxiliaries)
      instantMessagesFetched = true
    }
  }, [auxiliaries])

  useEffect(() => {
    setHelloText(minuteTick)
    setDate(minuteTick)
  }, [minuteTick])

  const startBlinking = () => {
    let opacity = 0
    let add = true
    const interval = setInterval(() => {
      setFadeIn(opacity)
      if (add) opacity += 1
      else opacity -= 1

      add = !(opacity === 1)
    }, 600)

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

  const textColor = colorUtils.getTextColor(time)

  return (
    <SleepTimer>
      <>
        <TimerInitiator />
        <MessageAlertManager />
        <AccountChecker />
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
          colors={color}
          style={{ flex: 1 }}
        >
          <Heading
            size="xl"
            style={{ color: textColor, ...styles.title, fontSize: 30 }}
          >
            {BOLD(hello.title)}
          </Heading>
          <View style={styles.content}>
            <Heading
              size="xl"
              style={{ textAlign: 'center', color: textColor }}
            >
              {hello.content}
            </Heading>
            {BR}
            <Heading
              size="xl"
              style={{ textAlign: 'center', color: textColor, opacity: fadeIn }}
            >
              {hello.footer}
            </Heading>
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
          <ContactButton hasNewMessage={hasNewMessage} color={textColor} />
        </View>
      </>
    </SleepTimer>
  )
}
export default SolarScreen
