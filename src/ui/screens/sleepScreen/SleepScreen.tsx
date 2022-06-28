import React, { useEffect } from 'react'
import { View, TouchableHighlight } from 'react-native'

import { Actions } from '@ami-app/react-native-router-flux'

import { Container, Heading } from 'native-base'
import MessageAlertManager from 'ui/business/MessageAlertManager'
import useActivityLog from '../../hooks/use-activity-log'
import { useDispatch } from 'react-redux'
import { NavigationActions } from 'store/navigation'
import { WAKEUP_DURATION } from 'utils/constant'
import TimerInitiator from 'ui/business/TimerInitiator'

const SleepScreen = () => {
  const dispatch = useDispatch()

  const logActivity = useActivityLog()
  const handlePress = () => {
    console.log('NavigationActions: toto')
    logActivity('wake_up')
    Actions.root()
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      Actions.root()
    }, WAKEUP_DURATION)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      <TimerInitiator />
      <MessageAlertManager
        onRedirect={() => {
          Actions.root()
        }}
      />
      <TouchableHighlight style={{ flex: 1 }} onPress={handlePress}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#000000',
          }}
        >
          <Heading
            size="xl"
            style={{
              color: 'rgba(255, 255, 255, 0.06)',
              fontFamily: 'Roboto',
              fontSize: 80,
              paddingTop: 80,
              textAlign: 'center',
              height: 120,
            }}
          >
            A.M.I
          </Heading>
        </View>
      </TouchableHighlight>
    </>
  )
}

export default SleepScreen
