import React from 'react';
import { Image } from 'react-native';
import { Card, CardItem } from 'native-base';

export default ({ uri }) => {
  return (
    <Card style={{ flex: 1 }}>
      <CardItem body style={{ height: '100%' }}>
        <Image source={uri} style={{ height: '100%', width: null, flex: 1 }} resizeMode="cover" />
      </CardItem>
    </Card>
  )
}