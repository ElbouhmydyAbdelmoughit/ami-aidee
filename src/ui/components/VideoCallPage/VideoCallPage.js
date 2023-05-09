import { Translations } from 'core/i18n'
import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text,View } from 'react-native'
import { IconButton } from 'react-native-paper'
import { Actions } from 'react-native-router-flux'
import Sound from 'react-native-sound'
import useTextColor from 'ui/hooks/use-text-color'

import { usePrevious } from '../../../utils/hooks'
import { playHangupTone } from '../../../utils/sound'
import useActivityLog from '../../hooks/use-activity-log'
import GradientBackground from '../GradientBackground'
import UserAvatar from '../UserAvatar'
import VideoCallError from '../VideoCallError'
import VideoCallRoom from '../VideoCallRoom'

const styles = StyleSheet.create({
  root: {
    padding: 20,
    marginTop: 24,
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
  const textColor = useTextColor()
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
        return Translations.common.ringing
      case 'REFUSED_BY_CALLEE':
      case 'FAILURE':
        return Translations.common.no_response
      default:
        return null
    }
  }
  if (errored) {
    return <VideoCallError />
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
          <UserAvatar user={auxiliary} textColor={textColor} />
          <View style={{ marginTop: 32, alignItems: 'center' }}>
            <Text
              style={{ color: textColor, fontWeight: 'bold', fontSize: 24 }}
            >
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
              {Translations.common.to_cancel}
            </IconButton>
          </View>
        )}
      </View>
    </GradientBackground>
  )
}

export default VideoCallPage
