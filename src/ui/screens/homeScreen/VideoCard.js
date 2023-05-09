import { Heading } from 'native-base'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
// import Video from 'react-native-video'
import {
  ActivityIndicator,
  findNodeHandle,
  Platform,
  StyleSheet,
  UIManager,
  View,
} from 'react-native'
import VideoView from 'ui/components/videoView'

let playerHandle
const VideoCard = ({ uri }, ref) => {
  const [volume, setVolume] = useState(1)
  const [lastState, setLastState] = useState('INITIAL')
  const [error, setError] = useState(false)
  const [replay, setReplay] = useState(false)
  const [loading, setLoading] = useState(true)
  const playerRef = useRef()

  useImperativeHandle(ref, () => ({
    reload: () => {
      reload()
    },
    setVolume: value => {
      setVolume(value)
    },
  }))

  useEffect(() => {
    if (playerRef.current) {
      playerHandle = findNodeHandle(playerRef.current)
    }
  }, [playerRef.current])

  const onLoad = payload => {}

  const reload = () => {
    if (Platform.OS === 'ios') {
      if (replay) {
        setReplay(false)
      }
      setTimeout(() => {
        setReplay(true)
      }, 0)
    } else {
      UIManager.dispatchViewManagerCommand(playerHandle, 0, null)
    }
  }

  const onReady = isReady => {
    console.log('READY')
    setLastState('READY')
  }

  const onError = () => {
    console.log('ERROR')
    setLastState('ERROR')
  }

  const onLoadStart = () => {
    console.log('LOADING')
    setLastState('LOADING')
  }

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <VideoView
        ref={playerRef}
        urlPath={uri}
        replay={replay}
        volume={volume}
        onReady={onReady}
        onLoadStart={onLoadStart}
        onError={onError}
        style={{ width: '100%', height: '100%' }}
      />
      {lastState == 'LOADING' && (
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={true} />
        </View>
      )}
      {lastState == 'ERROR' && (
        <View style={styles.activityIndicatorWrapper}>
          <Heading style={{ textAlign: 'center', color: '#fff' }}>
            {'Oops. La vidéo ne peut pas être chargé.'}
          </Heading>
        </View>
      )}
    </View>
  )
}
/*


{<VideoView
        ref={(ref) => player = ref}
        urlPath={uri}
        replay={replay}
        volume={volume}
        onReady={onReady}
        onLoadStart={onLoadStart}
        onError={onError}
        style={{ width: '100%', height: '100%'}}></VideoView>}
      {lastState == "LOADING" && <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={true} />
        </View>}

      {lastState == "ERROR" && <View style={styles.activityIndicatorWrapper}>
          <H3>{"Oops. La vidéo ne peut pas être chargé."}</H3>
      </View>}
 */

var styles = StyleSheet.create({
  backgroundVideo: {
    width: '100%',
    height: '100%',
    aspectRatio: 1,
  },
  activityIndicatorWrapper: {
    top: 0,
    right: 0,
    position: 'absolute',
    left: 0,
    justifyContent: 'space-around',
    display: 'flex',
    bottom: 0,
    borderRadius: 10,
    backgroundColor: '#000',
    alignItems: 'center',
  },
})

export default forwardRef(VideoCard)
