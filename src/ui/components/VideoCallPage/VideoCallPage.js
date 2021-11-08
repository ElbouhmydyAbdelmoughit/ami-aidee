import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Actions } from '@ami-app/react-native-router-flux'
import Sound from 'react-native-sound'
import { IconButton } from 'react-native-paper'

import VideoCallRoom from '../VideoCallRoom'
import UserAvatar from '../UserAvatar'
import VideoCallError from '../VideoCallError'
import GradientBackground from '../GradientBackground'
import { usePrevious } from '../../../utils/hooks'
import { playHangupTone } from '../../../utils/sound'
import useActivityLog from '../../hooks/use-activity-log'

const styles = StyleSheet.create({
  root: {
    marginTop: 24,
    padding: 20,
    height: '100%',
    alignItems: 'center',
  },
})

// much needed delay for users to cancel calls
// in case of mistake
const CALL_DELAY = 3000

const VideoCallPage = ({
  auxiliary,
  videoCallInvitationRequest,
  videoCallInvitationCancelRequest,
  videoCallInvitationInit,
  errored,
  localInvitation,
  myUid,
  startMode,
}) => {
  const { status, channelId, calleeId } = localInvitation || {}
  const logActivity = useActivityLog()
  const callTone = useRef()
  const stopSound = () => {
    if (callTone.current) {
      callTone.current.stop()
      callTone.current.release()
    }
  }

  const onCallCancel = () => {
    if (['INVITATION_SENT', 'RECEIVED'].indexOf(status) !== -1) {
      videoCallInvitationCancelRequest()
    }
    stopSound()
    playHangupTone()
    setTimeout(() => Actions.pop(), 0)
  }

  useEffect(() => {
    videoCallInvitationInit()
    const timeout = setTimeout(() => {
      videoCallInvitationRequest({
        calleeId: auxiliary.user_id,
        mode: startMode,
      })
    }, CALL_DELAY)
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [])
  if (errored) {
    return <VideoCallError />
  }

  const previousStatus = usePrevious(status)

  useEffect(() => {
    if (['INVITATION_SENT', 'RECEIVED'].indexOf(previousStatus) === -1) {
      return
    }
    if (status === 'RECEIVED') {
      callTone.current = new Sound('calltone.wav', Sound.MAIN_BUNDLE, error => {
        if (error) {
          // ignore
          return
        }
        callTone.current.play()
      })
      callTone.current.setNumberOfLoops(-1)
    }
    if (['REFUSED_BY_CALLEE', 'FAILURE'].indexOf(status) !== -1) {
      setTimeout(() => {
        stopSound()
        playHangupTone()
        Actions.pop()
      }, 2000)
    }
    if (status === 'ACCEPTED') {
      stopSound()
    }
  }, [status])

  const getText = () => {
    switch (status) {
      case 'INVITATION_SENT':
        return ''
      case 'RECEIVED':
        return 'Ça sonne...'
      case 'REFUSED_BY_CALLEE':
      case 'FAILURE':
        return 'Pas de réponse'
      default:
        return null
    }
  }
  if (
    ['INVITATION_SENT', 'RECEIVED'].indexOf(previousStatus) !== -1 &&
    status === 'ACCEPTED' &&
    channelId
  ) {
    return (
      <VideoCallRoom
        channelId={channelId}
        uid={myUid}
        remoteId={calleeId}
        mode={startMode}
      />
    )
  }

  const waiting = ['INIT', 'INVITATION_SENT', 'RECEIVED'].indexOf(status) !== -1
  return (
    <GradientBackground>
      <View style={styles.root}>
        <View style={{ flex: 1 }}>
          <UserAvatar user={auxiliary} />
          <View style={{ marginTop: 32, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24 }}>
              {getText()}
            </Text>
          </View>
        </View>
        {waiting && (
          <View style={{ marginBottom: 32 }}>
            <IconButton
              size={40}
              onPress={(...args) => {
                logActivity('press_cancel_video_btn')
                onCallCancel(...args)
              }}
              icon="call"
              color="white"
              style={{
                width: 60,
                height: 60,
                backgroundColor: 'red',
                borderRadius: 30,
              }}
            >
              Annuler
            </IconButton>
          </View>
        )}
      </View>
    </GradientBackground>
  )
}

export default VideoCallPage
