import React, { useState, forwardRef, useImperativeHandle } from 'react';
//import Video from 'react-native-video'

import { View } from 'react-native' 
import { VideoView } from 'src/ui/components'
import { Body, Card, CardItem } from 'native-base';

const VideoCard = ({ uri }, ref) => {

  const [replay, setReplay] = useState(false)
  const [volume, setVolume] = useState(1)
  useImperativeHandle(ref, () => ({
     reload:() => {reload()},
     setVolume:(value) => {setVolume(value)}
  }))

  let player = null
  const onLoad = (payload) => {

  }

  const reload = () => {
    console.log(player)
    setReplay(true)
    setTimeout(function () { 
      setReplay(false) }, 200);
  }

  return (
  <View  style={{
    width: '100%',
    height: '100%',
    backgroundColor: '#000'
  }}>
  <VideoView  
    ref={ (ref) => player = ref}
    urlPath={uri}
    replay={replay}
    volume={volume}
    style={{
     width: '100%',
     height: '100%',
    }}></VideoView></View>)
  /*return (
          <Video
            source={uri}
            ref={(ref) => { player = ref }}  // Store reference
            controls={false}
            volume={volume}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#000'
            }}
          />
  )*/
}

export default forwardRef(VideoCard)