import React, { useEffect, useState } from 'react'
import {
  NativeModules,
  Platform,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { Text } from 'react-native-paper'
import { RtcEngine, AgoraView } from 'react-native-agora'
import requestCameraAndAudioPermission from './permission'

const { Agora } = NativeModules
const { FPS30, AudioProfileDefault, AudioScenarioDefault, Adaptative } = Agora

const config = {
  //Setting config of the app
  // AMI Project
  appid: '55c1121c594a4daca6862e44a7ed08e3',
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
  buttonHolder: {
    height: 100,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#0093E9',
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
  },
  fullView: {
    width: dimensions.width,
    height: dimensions.height - 100,
  },
  halfViewRow: {
    flex: 1 / 2,
    flexDirection: 'row',
  },
  full: {
    flex: 1,
  },
  half: {
    flex: 1 / 2,
  },
  localVideoStyle: {
    width: 120,
    height: 150,
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 100,
  },
  noUserText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#0093E9',
  },
})

const VideoCallScreen = () => {
  const [peerIds, setPeerIds] = useState([])
  const [joinSucceed, setJoinSucceed] = useState(false)
  const [channelName, setChannelName] = useState('channel-x')
  const [uid, setUid] = useState(Math.floor(Math.random() * 100))

  const startCall = () => {
    RtcEngine.joinChannel(channelName, uid) //Join Channel
    RtcEngine.enableAudio() //Enable the audio
  }

  const endCall = () => {
    RtcEngine.leaveChannel()
    setJoinSucceed(false)
    setPeerIds([])
  }
  useEffect(() => {
    RtcEngine.init(config)
    if (Platform.OS === 'android') {
      //Request required permissions from Android
      requestCameraAndAudioPermission().then(_ => {
        console.log('requested!')
      })
    }

    RtcEngine.on('userJoined', data => {
      if (peerIds.indexOf(data.uid) === -1) {
        //If new user has joined
        setPeerIds(list => [...list, data.uid])
      }
    })
    RtcEngine.on('userOffline', data => {
      //If user leaves
      setPeerIds(list => list.filter(uid => uid !== data.uid))
    })
    RtcEngine.on('joinChannelSuccess', () => {
      //If Local user joins RTC channel
      RtcEngine.startPreview() //Start RTC preview
      setJoinSucceed(true)
    })
  }, [])
  return (
    <View style={styles.max}>
      {
        <View style={styles.max}>
          <View style={styles.buttonHolder}>
            <TouchableOpacity
              title="Start Call"
              onPress={startCall}
              style={styles.button}
            >
              <Text style={styles.buttonText}> Start Call </Text>
            </TouchableOpacity>
            <TouchableOpacity
              title="End Call"
              onPress={endCall}
              style={styles.button}
            >
              <Text style={styles.buttonText}> End Call </Text>
            </TouchableOpacity>
          </View>
          {!joinSucceed ? (
            <View />
          ) : (
            <View style={styles.fullView}>
              {peerIds.length > 3 ? ( //view for four videostreams
                <View style={styles.full}>
                  <View style={styles.halfViewRow}>
                    <AgoraView
                      style={styles.half}
                      remoteUid={peerIds[0]}
                      mode={1}
                    />
                    <AgoraView
                      style={styles.half}
                      remoteUid={peerIds[1]}
                      mode={1}
                    />
                  </View>
                  <View style={styles.halfViewRow}>
                    <AgoraView
                      style={styles.half}
                      remoteUid={peerIds[2]}
                      mode={1}
                    />
                    <AgoraView
                      style={styles.half}
                      remoteUid={peerIds[3]}
                      mode={1}
                    />
                  </View>
                </View>
              ) : peerIds.length > 2 ? ( //view for three videostreams
                <View style={styles.full}>
                  <View style={styles.half}>
                    <AgoraView
                      style={styles.full}
                      remoteUid={peerIds[0]}
                      mode={1}
                    />
                  </View>
                  <View style={styles.halfViewRow}>
                    <AgoraView
                      style={styles.half}
                      remoteUid={peerIds[1]}
                      mode={1}
                    />
                    <AgoraView
                      style={styles.half}
                      remoteUid={peerIds[2]}
                      mode={1}
                    />
                  </View>
                </View>
              ) : peerIds.length > 1 ? ( //view for two videostreams
                <View style={styles.full}>
                  <AgoraView
                    style={styles.full}
                    remoteUid={peerIds[0]}
                    mode={1}
                  />
                  <AgoraView
                    style={styles.full}
                    remoteUid={peerIds[1]}
                    mode={1}
                  />
                </View>
              ) : peerIds.length > 0 ? ( //view for videostream
                <AgoraView
                  style={styles.full}
                  remoteUid={peerIds[0]}
                  mode={1}
                />
              ) : (
                <View>
                  <Text style={styles.noUserText}> No users connected </Text>
                </View>
              )}
              <AgoraView
                style={styles.localVideoStyle}
                zOrderMediaOverlay={true}
                showLocalVideo={true}
                mode={1}
              />
            </View>
          )}
        </View>
      }
    </View>
  )
}

export default VideoCallScreen
