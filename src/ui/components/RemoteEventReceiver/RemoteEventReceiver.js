import { useEffect } from 'react'
import { Actions } from 'react-native-router-flux'
import { Core } from 'src/core'

import PushNotificationIOS from '@react-native-community/push-notification-ios'
import PushNotification from 'react-native-push-notification'

import messaging from '@react-native-firebase/messaging'
import { Platform } from 'react-native'
import errorReporter from 'core/error-reporter'
import { UserActions } from '../../../store/users'

const RemoteEventReceiver = ({
  myUid,
  videoCallInit,
  dispatch,
  incomingCall,
  onNewInstantMessage,
}) => {
  useEffect(() => {
    console.log('myUid', myUid)
    if (!myUid) {
      return
    }
    PushNotification.configure({
      onRegister(token) {
        if (Platform.OS === 'android') {
          console.log('PushNotification/ TOKEN:', token)
          // do not register for ios since it's APNS token
          Core.store.dispatch(UserActions.registerTokenRequest(token))
        }
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
    if (Platform.OS !== 'ios') {
      return
    }
    messaging().registerDeviceForRemoteMessages()

    messaging()
      .getToken()
      .then(token => {
        console.log('FirebaseMessaging/ TOKEN:', token)
        Core.store.dispatch(UserActions.registerTokenRequest(token))
      })
      .catch(e => errorReporter.report(e))
  }, [myUid])

  useEffect(() => {
    if (incomingCall) {
      Actions.receivingScreen()
    }
  }, [incomingCall])
  return null
}

export default RemoteEventReceiver
