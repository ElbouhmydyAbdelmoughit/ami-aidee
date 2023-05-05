import { Heading } from 'native-base'
import React, { useEffect } from 'react'
import { TouchableHighlight,View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { useDispatch } from 'react-redux'
import MessageAlertManager from 'ui/business/MessageAlertManager'
import TimerInitiator from 'ui/business/TimerInitiator'
import { WAKEUP_DURATION } from 'utils/constant'

import useActivityLog from '../../hooks/use-activity-log'

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
            size={'xl'}
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
