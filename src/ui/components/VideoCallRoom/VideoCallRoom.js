import { Translations } from 'core/i18n'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Alert,
  Dimensions,
  NativeModules,
  Platform,
  StyleSheet,
  View,
} from 'react-native'
import { AgoraView,RtcEngine } from 'react-native-agora'
import { IconButton,Text } from 'react-native-paper'
import { Actions } from 'react-native-router-flux'
import useTextColor from 'ui/hooks/use-text-color'

import { AGORA_APP_ID } from '../../../utils/constant'
import { playHangupTone } from '../../../utils/sound'
import useActivityLog from '../../hooks/use-activity-log'
import GradientBackground from '../GradientBackground'
import UserAvatar from '../UserAvatar'
import {
  requestAudioPermission,
  requestCameraAndAudioPermission,
} from './permission'
import RemoteAudioView from './RemoteAudioView'
import VideoCallEnded from './VideoCallEnded'

const { Agora } = NativeModules
const { FPS30, AudioProfileDefault, AudioScenarioDefault, Adaptative } = Agora

const config = {
  // Setting config of the app
  // AMI Project
  appid: AGORA_APP_ID,
  // CHANNEL_PROFILE_COMMUNICATION  (Default) The Communication profile.
  // Use this profile in one-on-one calls or group calls
  // where all users can talk freely.
  // https://docs.agora.io/en/Video/API%20Reference/java/classio_1_1agora_1_1rtc_1_1_rtc_engine.html#a1bfb76eb4365b8b97648c3d1b69f2bd6
  channelProfile: 0,
  videoEncoderConfig: {
    // Set Video feed encoder settings
    // the config for which the rate is $3.99 per/1,000 minutes
    // and not $14.99 per/1,000 minutes
    // https://www.agora.io/en/pricing/
    width: 720,
    height: 1080,
    // TODO
    bitrate: 1,
    // TODO
    frameRate: FPS30,
    // TODO
    orientationMode: Adaptative,
  },
  // TODO
  audioProfile: AudioProfileDefault,
  // TODO
  audioScenario: AudioScenarioDefault,
}

const dimensions = {
  // get dimensions of the device to use in view styles
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}

const styles = StyleSheet.create({
  remoteVideoStyle: {
    width: (9 * dimensions.height) / 16,
    height: dimensions.height,
    alignSelf: 'center',
  },
  overlay: {
    width: '100%',
    position: 'absolute',
    height: '100%',
    backgroundColor: 'rgba(50, 209, 231, 0.44)',
  },
  max: {
    flex: 1,
  },
  localVideoStyle: {
    zIndex: 100,
    width: 200,
    top: 5,
    right: 5,
    position: 'absolute',
    height: 150,
  },
  infoText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
  },

  fullView: {
    width: dimensions.width,
    height: dimensions.height,
  },
  full: {
    flex: 1,
  },
  endCallBtn: {
    width: 60,
    padding: 4,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
  },
  emptyView: {
    backgroundColor: 'rgb(50, 209, 231)',
  },
  buttonsBox: {
    width: dimensions.width,
    position: 'absolute',
    bottom: 64,
    alignItems: 'center',
  },
})

// TOFIX: for an unknown reason status is set back to initial on unmount,
// making it unusable for checking whether endCall is called.
// This hasEnded is used as a workaround to this problem
let hasEnded
const VideoCallRoom = ({ remoteAuxiliary, mode, channelId }) => {
  const logActivity = useActivityLog()
  const [peerIds, setPeerIds] = useState([])
  const [joinSucceed, setJoinSucceed] = useState(false)
  const [status, setStatus] = useState('initial')
  const textColor = useTextColor()
  const joinChannel = () => {
    hasEnded = false
    RtcEngine.joinChannel(channelId, Math.floor(Math.random() * 100)) // Join Channel
  }

  const endCall = () => {
    logActivity('press_cancel_video_btn')
    if (hasEnded) {
      return
    }
    hasEnded = true
    RtcEngine.leaveChannel()
    setJoinSucceed(false)
    setPeerIds([])
    Actions.pop()
  }
  const { t } = useTranslation()
  useEffect(() => {
    console.log(hasEnded)
  }, [hasEnded])

  useEffect(() => {
    const asyncFn = async () => {
      RtcEngine.init({
        ...config,
        mode: mode === 'audio' ? 0 : undefined,
      })
      if (Platform.OS === 'android') {
        // Request required permissions from Android
        if (mode === 'audio') {
          try {
            await requestAudioPermission()
          } catch (e) {
            Alert.alert(
              t('modal.call_error.title', "L'appel ne peut pas être abouti"),
              t(
                'modal.call_error.no_audio_permission',
                "L'application n'a pas la permission pour accéder à l'audio."
              )
            )
            Actions.pop()
            return
          }
        } else {
          try {
            await requestCameraAndAudioPermission()
          } catch (e) {
            Alert.alert(
              t('modal.call_error.title', "L'appel ne peut pas être abouti"),
              t(
                'modal.call_error.no_audio_and_camera_permission',
                "L'application n'a pas la permission pour accéder à l'audio et la caméra."
              )
            )
            Actions.pop()
            return
          }
        }
      }

      RtcEngine.on('userJoined', data => {
        if (peerIds.indexOf(data.uid) === -1) {
          // If new user has joined
          setPeerIds(list => [...list, data.uid])
          setStatus('remote_joined')
        }
      })
      RtcEngine.on('userOffline', data => {
        // If user leaves
        setPeerIds(list => list.filter(uid => uid !== data.uid))
        setStatus('remote_leaved')
        playHangupTone()
      })
      RtcEngine.on('joinChannelSuccess', () => {
        // If Local user joins RTC channel
        RtcEngine.startPreview() // Start RTC preview
        setJoinSucceed(true)
        setStatus('local_joined')
      })

      RtcEngine.on('error', error => {
        console.log('error', error)
      })
      joinChannel()
    }
    asyncFn()
    return () => {
      console.log(hasEnded)
      endCall()
      RtcEngine.removeAllListeners()
    }
  }, [])

  const getEndCallBtn = () => {
    return (
      <View style={styles.endCallBtn}>
        <IconButton size={40} onPress={endCall} icon="call" color="white">
          {Translations.common.to_cancel}
        </IconButton>
      </View>
    )
  }
  const getWaitingView = () => {
    return (
      <GradientBackground>
        <View style={{ flex: 1, marginTop: 64 }}>
          <UserAvatar user={remoteAuxiliary} textColor={textColor} />
          <View style={{ marginTop: 32, alignItems: 'center' }}>
            <Text style={[styles.infoText, { color: textColor }]}>
              {Translations.common.connection_in_progress}
            </Text>
          </View>
        </View>
        <View style={{ marginBottom: 32, alignItems: 'center' }}>
          {getEndCallBtn()}
        </View>
      </GradientBackground>
    )
  }
  const getJoinSucceedView = () => {
    return (
      <>
        <AgoraView
          style={styles.full}
          zOrderMediaOverlay={true}
          showLocalVideo={true}
          mode={1}
        />
        <View style={styles.overlay}>
          <View style={{ flex: 1, marginTop: 64 }}>
            <UserAvatar user={remoteAuxiliary} textColor={textColor} />
            <View style={{ marginTop: 32, alignItems: 'center' }}>
              <Text style={[styles.infoText, { color: textColor }]}>
                {Translations.common.connection_in_progress}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 32, alignItems: 'center' }}>
          {getEndCallBtn()}
        </View>
      </>
    )
  }
  const getRemoteStreamView = () => {
    const remoteView =
      mode === 'audio' ? (
        <RemoteAudioView remoteAuxiliary={remoteAuxiliary} />
      ) : (
        <AgoraView
          style={styles.remoteVideoStyle}
          remoteUid={peerIds[0]}
          mode={1}
        />
      )
    const localView =
      mode === 'audio' ? null : (
        <AgoraView
          style={styles.localVideoStyle}
          zOrderMediaOverlay={true}
          showLocalVideo={true}
          mode={1}
        />
      )
    return (
      <GradientBackground>
        <View />
        {remoteView}
        {localView}
        <View style={styles.buttonsBox}>{getEndCallBtn()}</View>
      </GradientBackground>
    )
  }

  if (status === 'remote_leaved') {
    return <VideoCallEnded auxiliary={remoteAuxiliary} />
  }
  return (
    <View style={styles.max}>
      {
        <View style={styles.max}>
          {!joinSucceed ? (
            getWaitingView()
          ) : (
            <View style={styles.fullView}>
              {peerIds.length > 0 // view for videostream
                ? getRemoteStreamView()
                : getJoinSucceedView()}
            </View>
          )}
        </View>
      }
    </View>
  )
}

export default VideoCallRoom
