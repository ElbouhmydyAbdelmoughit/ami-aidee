import React from 'react'
import { Image, ActivityIndicator, View, Text } from 'react-native'
import { Card, CardItem } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons'

const styles = {
  secondaryInfo: {
    fontSize: 20,
    fontWeight: '500',
    color: '#777',
    marginBottom: 16,
  },
}
export default ({ uri, message }) => {
  const { location } = message
  return (
    <Card style={{ flex: 1 }}>
      <CardItem body style={{ height: '100%' }}>
        <ActivityIndicator
          style={{
            position: 'absolute',
            zIndex: 1,
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
          animating={true}
        />
        {location ? (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 8,
              alignSelf: 'flex-start',
            }}
          >
            <Icon
              name={'location-on'}
              size={24}
              color={'#999'}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.secondaryInfo}>{location}</Text>
          </View>
        ) : null}
        <Image
          source={uri}
          style={{ height: '100%', width: null, flex: 1, zIndex: 2 }}
          resizeMode="contain"
        />
      </CardItem>
    </Card>
  )
}
