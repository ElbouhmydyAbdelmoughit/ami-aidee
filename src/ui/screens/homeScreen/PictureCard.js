import React from 'react';
import { Image, ActivityIndicator } from 'react-native';
import { Card, CardItem } from 'native-base';

export default ({ uri }) => {
  return (
    <Card style={{ flex: 1 }}>
      <CardItem body style={{ height: '100%' }}>
        <ActivityIndicator style={{position: 'absolute', zIndex: 1, top: 0, bottom: 0, right: 0, left: 0}} animating={true} />
        <Image source={uri} style={{ height: '100%', width: null, flex: 1, zIndex: 2 }} resizeMode="contain" />
      </CardItem>
    </Card>
  )
}