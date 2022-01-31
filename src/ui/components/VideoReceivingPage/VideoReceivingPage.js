import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { IconButton } from 'react-native-paper'
import { Actions } from '@ami-app/react-native-router-flux'

import Sound from 'react-native-sound'
import UserAvatar from '../UserAvatar'
import CallErrorPage from '../VideoCallError'
import VideoCallRoom from '../VideoCallRoom'
import GradientBackground from '../GradientBackground'
import { playHangupTone } from '../../../utils/sound'
import useCountdown from '../../hooks/use-countdown'
import useActivityLog from '../../hooks/use-activity-log'
import { Translations } from 'core/i18n'
import { useTranslation } from 'react-i18next'

const styles = StyleSheet.create({
  root: {
    padding: 20,
    height: '100%',
  },
})

let answered = false
let ringtone
const CallReceivingScreen = ({
  errored,
  refuseCallInvitation,
  acceptCallInvitation,
  remoteInvitationProps,
  myUid,
  callingRemoteAuxiliary,
  currentHelpedUser,
}) => {
  const { status, channelId, callerId } = remoteInvitationProps || {}
  const { t } = useTranslation()

  const callCanceledByCaller = status === 'CANCELED_BY_CALLER'

  const stopSound = () => {
    if (ringtone) {
      ringtone.stop()
      ringtone.release()
    }
  }
  const logActivity = useActivityLog()
  const { automatic_pickup: automaticPickup } = currentHelpedUser

  const onRefuseCall = () => {
    logActivity('press_cancel_video_btn')
    if (answered) {
      return
    }
    answered = true
    stopSound()
    playHangupTone()
    refuseCallInvitation()
  }

  const onAcceptCall = () => {
    logActivity('press_accept_video_btn')
    if (answered) {
      return
    }
    answered = true
    stopSound()
    acceptCallInvitation()
  }

  const countdown = useCountdown(3)
  useEffect(() => {
    if (automaticPickup && countdown === 0 && !callCanceledByCaller) {
      onAcceptCall()
    }
  }, [countdown])

  useEffect(() => {
    answered = false
    ringtone = new Sound('ringtone.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        // ignore
        console.log('sound error', error)
        return
      }
      ringtone.setNumberOfLoops(-1)
      ringtone.play()
    })
    return () => {
      stopSound()
    }
  }, [])

  useEffect(() => {
    if (status === 'CANCELED_BY_CALLER') {
      setTimeout(() => {
        stopSound()
        playHangupTone()
        Actions.pop()
      }, 2000)
    }
  }, [status])
  if (errored) {
    return <CallErrorPage />
  }
  if (status === 'ACCEPTED' && channelId) {
    return (
      <VideoCallRoom
        channelId={channelId}
        uid={myUid}
        remoteId={callerId}
        mode={remoteInvitationProps.mode || 'video'}
      />
    )
  }

  const getText = () => {
    if (callCanceledByCaller) {
      return t('screen.video_call.other_hung_up', "L'aidant a raccroché")
    }
    if (automaticPickup) {
      return t('screen.video_call.automatic_pickup_in', {
        defaultValue: 'Décrochage automatique dans {{count}} secondes',
        count: countdown,
      })
    }
    return null
  }
  const text = getText()
  return (
    <GradientBackground>
      <View style={styles.root}>
        <View style={{ flex: 1, alignItems: 'center', marginTop: 64 }}>
          <UserAvatar user={callingRemoteAuxiliary} />
          {text && (
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: 'white',
                marginTop: 64,
              }}
            >
              {text}
            </Text>
          )}
        </View>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 16,
              width: '25%',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            {!callCanceledByCaller && (
              <IconButton
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: 'red',
                  borderRadius: 30,
                }}
                size={40}
                onPress={onRefuseCall}
                icon="close"
                color="white"
              >
                {Translations.common.to_cancel}
              </IconButton>
            )}
            {!callCanceledByCaller && (
              <IconButton
                size={40}
                onPress={onAcceptCall}
                icon="call"
                color="white"
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: '#0B8167',
                  borderRadius: 30,
                }}
              >
                {Translations.common.to_accept}
              </IconButton>
            )}
          </View>
        </View>
      </View>
    </GradientBackground>
  )
}

export default CallReceivingScreen
