import React, { useEffect, useState, useCallback } from 'react'
import {
  NativeModules,
  Platform,
  View,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native'
import { Text, IconButton } from 'react-native-paper'
import { RtcEngine, AgoraView } from 'react-native-agora'
import { Actions } from '@ami-app/react-native-router-flux'
import {
  requestCameraAndAudioPermission,
  requestAudioPermission,
} from './permission'
import { AGORA_APP_ID } from '../../../utils/constant'
import UserAvatar from '../UserAvatar'
import VideoCallEnded from './VideoCallEnded'
import GradientBackground from '../GradientBackground'
import RemoteAudioView from './RemoteAudioView'
import { playHangupTone } from '../../../utils/sound'
import useActivityLog from '../../hooks/use-activity-log'
import { useTranslation } from 'react-i18next'
import { Translations } from 'core/i18n'
import { useDispatch } from 'react-redux'
import { NavigationActions } from 'store/navigation'
import useTextColor from 'ui/hooks/use-text-color'

const { Agora } = NativeModules
const { FPS30, AudioProfileDefault, AudioScenarioDefault, Adaptative } = Agora

const config = {
  //Setting config of the app
  // AMI Project
  appid: AGORA_APP_ID,
  // CHANNEL_PROFILE_COMMUNICATION  (Default) The Communication profile.
  // Use this profile in one-on-one calls or group calls
  // where all users can talk freely.
  // https://docs.agora.io/en/Video/API%20Reference/java/classio_1_1agora_1_1rtc_1_1_rtc_engine.html#a1bfb76eb4365b8b97648c3d1b69f2bd6
  channelProfile: 0,
  videoEncoderConfig: {
    //Set Video feed encoder settings
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
  //get dimensions of the device to use in view styles
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}

const styles = StyleSheet.create({
  max: {
    flex: 1,
  },
  fullView: {
    width: dimensions.width,
    height: dimensions.height,
  },
  remoteVideoStyle: {
    width: (9 * dimensions.height) / 16,
    height: dimensions.height,
    alignSelf: 'center',
  },
  emptyView: {
    backgroundColor: 'rgb(50, 209, 231)',
  },
  full: {
    flex: 1,
  },

  localVideoStyle: {
    width: 200,
    height: 150,
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 100,
  },
  buttonsBox: {
    position: 'absolute',
    bottom: 64,
    width: dimensions.width,
    alignItems: 'center',
  },
  endCallBtn: {
    backgroundColor: 'red',
    width: 60,
    height: 60,
    borderRadius: 30,
    padding: 4,
  },
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(50, 209, 231, 0.44)',
  },
  infoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
})

// TOFIX: for an unknown reason status is set back to initial on unmount,
// making it unusable for checking whether endCall is called.
// This hasEnded is used as a workaround to this problem
let hasEnded
const VideoCallRoom = ({ remoteAuxiliary, mode }) => {
  const logActivity = useActivityLog()
  const [peerIds, setPeerIds] = useState([])
  const [joinSucceed, setJoinSucceed] = useState(false)
  const [channelName, setChannelName] = useState('abcxyz')
  const [uid, setUid] = useState(Math.floor(Math.random() * 100))
  const [status, setStatus] = useState('initial')
  const textColor = useTextColor()
  const startCall = () => {
    hasEnded = false
    RtcEngine.joinChannel(channelName, uid) //Join Channel
  }

  const dispatch = useDispatch()
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
    dispatch(NavigationActions.exitBusyState())
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
        //Request required permissions from Android
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
          //If new user has joined
          setPeerIds(list => [...list, data.uid])
          setStatus('remote_joined')
        }
      })
      RtcEngine.on('userOffline', data => {
        //If user leaves
        setPeerIds(list => list.filter(uid => uid !== data.uid))
        setStatus('remote_leaved')
        playHangupTone()
      })
      RtcEngine.on('joinChannelSuccess', () => {
        //If Local user joins RTC channel
        RtcEngine.startPreview() //Start RTC preview
        setJoinSucceed(true)
        setStatus('local_joined')
      })

      RtcEngine.on('error', error => {
        console.log('error', error)
      })

      startCall()
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
      <React.Fragment>
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
      </React.Fragment>
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
              {peerIds.length > 0 //view for videostream
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
