import React, { useState, forwardRef, useImperativeHandle } from 'react';
//import Video from 'react-native-video'

import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { VideoView } from 'src/ui/components'
import { Body, Card, CardItem, H3 } from 'native-base';

const VideoCard = ({ uri }, ref) => {

  const [volume, setVolume] = useState(1)
  const [lastState, setLastState] = useState("INITIAL")
  const [error, setError] = useState(false)
  const [replay, setReplay] = useState(false)
  const [loading, setLoading] = useState(true)

  useImperativeHandle(ref, () => ({
    reload: () => { reload() },
    setVolume: (value) => { setVolume(value) }
  }))

  let player = null
  const onLoad = (payload) => {

  }

  const reload = () => {
    console.log(player)
    setReplay(true)
    setTimeout(function () {
      setReplay(false)
    }, 200);
  }

  const onReady = (isReady) => {
    console.log("READY")
    setLastState("READY")
  }

  const onError = () => {
    console.log("ERROR")
    setLastState("ERROR")
  }

  const onLoadStart = () => {
    console.log("LOADING")
    setLastState("LOADING")
  }

  return (
    <View style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#000'
    }}>

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
    </View>
  )
}

const styles = StyleSheet.create({

  activityIndicatorWrapper: {
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default forwardRef(VideoCard)