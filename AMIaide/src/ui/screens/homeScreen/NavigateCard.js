import React, { useState } from 'react';
import { Image, Slider } from 'react-native';
import { Body, Card, CardItem, View, Text, Button, Icon, Left, Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
//import Slider from '@react-native-community/slider';

import { CircleButton } from 'src/ui/components'
export default ({ onNext, onPrevious, onReload, onVolumeChange }) => {

  const [size, setSize] = useState({ width: 50, height: 50 })
  const [volume, setVolume] = useState(1)

  const volumeChange = (value) => {
    setVolume(value)
    onVolumeChange(value)
  }


  return (
    <Card transparent style={{ flex: 1 }} onLayout={(event) => {
      var { x, y, width, height } = event.nativeEvent.layout;
      setSize({ width: width, height: height })
    }} >
      <CardItem body style={{ backgroundColor: 'transparent', width: '100%', height: '100%' }}>
        <Grid style={{ backgroundColor: 'transparent', width: '100%', height: '100%' }}>
          <Row size={20}>
            <Right />
            <CircleButton onPress={onReload} size={size.width / 4} source={require('src/assets/images/replay.png')} />
            <Left />
          </Row>
          <Row size={7}></Row>
          <Row size={10} style={styles.row}>
            <Image source={require('src/assets/images/sound.png')} style={{ width: 20, height: 20 }} resizeMode={"contain"}/>
            <Slider
              style={{ width: 200, height: 60 }}
              minimumValue={0}
              maximumValue={1}
              step={0.1}
              value={volume}
              onValueChange={volumeChange}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#C7C7C7"
            />
          </Row>
          <Row size={8}></Row>
          <Row size={55} style={styles.row}>
              <CircleButton onPress={onPrevious} size={size.width / 2.4} source={require('src/assets/images/back.png')} />
              <View style={{width: 20}}/>
              <CircleButton onPress={onNext} size={size.width / 2.4} source={require('src/assets/images/next.png')} />
          </Row>
        </Grid>

      </CardItem>
    </Card>
  )
}

const styles = {
  row: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  }
}