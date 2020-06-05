import React from 'react'
import { View, TouchableHighlight } from 'react-native'
import { Timer } from 'src/ui/components'

import { Actions } from 'react-native-router-flux'

import { Container, Content, Text } from 'native-base'
import material from 'AMIaide/native-base-theme/variables/material'
import MessageAlertManager from 'src/ui/business/MessageAlertManager'
import TimerInitiator from '../../business/TimerInitiator'

const SleepScreen = ({ auth, awake }) => {
  const handlePress = () => {
    awake()
    Actions.root()
  }

  return (
    <Container>
      <TimerInitiator />
      <MessageAlertManager
        onRedirect={() => {
          awake()
          Actions.root()
        }}
      />
      <Timer mode={'sleep'} />
      <TouchableHighlight style={{ flex: 1 }} onPress={handlePress}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'black',
          }}
        ></View>
      </TouchableHighlight>
    </Container>
  )
}

export default SleepScreen
