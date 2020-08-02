import { useEffect } from 'react'
import { Actions } from 'react-native-router-flux'
import { Core } from 'src/core'

import PushNotificationIOS from '@react-native-community/push-notification-ios'
import PushNotification from 'react-native-push-notification'
import { UserActions } from '../../../redux/users'

const RemoteEventReceiver = ({
  myUid,
  videoCallInit,
  dispatch,
  incomingCall,
  onNewInstantMessage,
}) => {
  useEffect(() => {
    if (!myUid) {
      return
    }
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister(token) {
        console.log('PushNotification/ TOKEN:', token)
        Core.store.dispatch(UserActions.registerTokenRequest(token))
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification(notification) {
        console.log('PushNotification/ NOTIFICATION:', notification)
        if (
          notification.data &&
          notification.data.event_type === 'new_incoming_message'
        ) {
          onNewInstantMessage(
            JSON.parse(notification.data.instant_message || {})
          )
        }
        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData)
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      requestPermissions: true,
    })
    videoCallInit({ dispatch })
  }, [myUid])

  useEffect(() => {
    if (incomingCall) {
      Actions.root()
      Actions.receivingScreen()
    }
  }, [incomingCall])
  return null
}

export default RemoteEventReceiver
