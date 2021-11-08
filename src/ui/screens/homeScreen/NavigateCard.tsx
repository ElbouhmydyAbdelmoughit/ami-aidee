import React, { useState } from 'react'
import { Image, Slider } from 'react-native'
import {
  Body,
  Card,
  CardItem,
  View,
  Text,
  Button,
  Icon,
  Left,
  Right,
  H3,
} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
//import Slider from '@react-native-community/slider';

import CircleButton from 'ui/components/circleButton'
import useActivityLog from '../../hooks/use-activity-log'
import { IconButton } from 'react-native-paper'

type Props = {
  onVolumeChange: (value: any) => void
  onReload: () => void
}
export default ({ onReload, onVolumeChange }: Props) => {
  const [size, setSize] = useState({ width: 50, height: 50 })
  const [volume, setVolume] = useState(1)

  const volumeChange = value => {
    setVolume(value)
    onVolumeChange(value)
  }

  const logActivity = useActivityLog()
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 16,
      }}
    >
      <Image
        source={require('src/assets/images/sound.png')}
        style={{ width: 36, height: 36 }}
        resizeMode={'contain'}
      />
      <View style={{ flex: 1, marginRight: 16 }}>
        <Slider
          style={{ width: '100%' }}
          minimumValue={0}
          maximumValue={1}
          step={0.1}
          value={volume}
          onValueChange={volumeChange}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#C7C7C7"
        />
      </View>
      <IconButton
        onPress={(...args) => {
          logActivity('reload_video')
          onReload(...args)
        }}
        color="white"
        size={40}
        style={{ width: 40, height: 40 }}
        icon="replay"
      />
    </View>
  )
}

const styles = {
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
}
