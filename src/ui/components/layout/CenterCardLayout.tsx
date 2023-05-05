import { Card } from 'native-base'
import React from 'react'
import { View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const color = ['#3FEDFF', '#8772FF']
const styles = {
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}
const CenterCardLayout = ({ children }) => {
  return (
    <LinearGradient
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 1.0, y: 1.0 }}
      colors={color}
      style={{ flex: 1 }}
    >
      <View style={styles.content}>
        <Card style={{ width: '60%', marginTop: 16, backgroundColor: 'white' }}>
          <View style={{ padding: 20 }}>{children}</View>
        </Card>
      </View>
    </LinearGradient>
  )
}

export default CenterCardLayout
