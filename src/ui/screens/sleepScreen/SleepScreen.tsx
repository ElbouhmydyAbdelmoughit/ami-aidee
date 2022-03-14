import React, { useEffect } from 'react'
import { View, TouchableHighlight } from 'react-native'

import { Actions } from '@ami-app/react-native-router-flux'

import { Container, H1 } from 'native-base'
import MessageAlertManager from 'ui/business/MessageAlertManager'
import useActivityLog from '../../hooks/use-activity-log'
import { useDispatch } from 'react-redux'
import { NavigationActions } from 'store/navigation'
import { ReturnToHomeState } from 'store/navigation/actions'

const SleepScreen = () => {
  const dispatch = useDispatch()

  const logActivity = useActivityLog()
  const handlePress = () => {
    console.log('NavigationActions: toto')
    logActivity('wake_up')
    Actions.root()
    // FIXME: this is duplication of AppRouter accueil scene onEnter
    // without this the sagas is not unblocked from race waiters
    dispatch(NavigationActions.changeReturnToHomeState('idle'))
    dispatch(NavigationActions.changeScreenSavingState('home'))
  }

  return (
    <Container>
      <MessageAlertManager
        onRedirect={(returnToHomeState: ReturnToHomeState) => {
          Actions.root()
          dispatch(NavigationActions.changeReturnToHomeState(returnToHomeState))
          dispatch(NavigationActions.changeScreenSavingState('home'))
        }}
      />
      <TouchableHighlight style={{ flex: 1 }} onPress={handlePress}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#000000EE',
          }}
        >
          <H1
            style={{
              color: 'rgba(255, 255, 255, 0.05)',
              fontFamily: 'Roboto',
              fontSize: 80,
              paddingTop: 80,
              textAlign: 'center',
              height: 120,
            }}
          >
            A.M.I
          </H1>
        </View>
      </TouchableHighlight>
    </Container>
  )
}

export default SleepScreen
