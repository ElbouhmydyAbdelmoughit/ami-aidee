import React, { forwardRef, useImperativeHandle } from 'react';
import Video from 'react-native-video'
import { Body, Card, CardItem } from 'native-base';

const VideoCard = ({ uri, volume }, ref) => {

  useImperativeHandle(ref, () => ({
     reload:() => {reload()}
  }))

  let player = null
  const onLoad = (payload) => {

  }

  const reload = () => {
    if (player != null)
      player.seek(0)
  }

  return (
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
  )
}

export default forwardRef(VideoCard)