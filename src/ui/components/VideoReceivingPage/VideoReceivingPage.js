import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { IconButton } from 'react-native-paper'
import Sound from 'react-native-sound'
import UserAvatar from '../UserAvatar'
import CallErrorPage from '../VideoCallError'
import VideoCallRoom from '../VideoCallRoom'
import GradientBackground from '../GradientBackground'
import { playHangupTone } from '../../../utils/sound'

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
}) => {
  const { status, channelId, callerId } = remoteInvitationProps || {}

  const stopSound = () => {
    if (ringtone) {
      ringtone.stop()
      ringtone.release()
    }
  }

  const onRefuseCall = () => {
    if (answered) {
      return
    }
    answered = true
    stopSound()
    playHangupTone()
    refuseCallInvitation()
  }

  const onAcceptCall = () => {
    if (answered) {
      return
    }
    answered = true
    stopSound()
    acceptCallInvitation()
  }

  useEffect(() => {
    answered = false
    ringtone = new Sound('ringtone.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        // ignore
        return
      }
      ringtone.setNumberOfLoops(-1)
      ringtone.play()
    })
    return () => {
      stopSound()
    }
  }, [])
  if (errored) {
    return <CallErrorPage />
  }
  if (status === 'ACCEPTED' && channelId) {
    return (
      <VideoCallRoom channelId={channelId} uid={myUid} remoteId={callerId} />
    )
  }
  return (
    <GradientBackground>
      <View style={styles.root}>
        <View style={{ flex: 1, alignItems: 'center', marginTop: 64 }}>
          <UserAvatar user={callingRemoteAuxiliary} />
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
              Annuler
            </IconButton>
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
              Accepter
            </IconButton>
          </View>
        </View>
      </View>
    </GradientBackground>
  )
}

export default CallReceivingScreen
