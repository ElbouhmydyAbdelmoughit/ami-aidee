import { View, Animated, Alert } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Setting from 'react-native-system-setting'
import { useSelector } from 'react-redux'
import { AuthSelectors } from 'store/auth'
import { IconButton } from 'react-native-paper'
import { Text } from 'react-native-svg'

const SystemVolumeManager = () => {
  const helpedUser = useSelector(AuthSelectors.getCurrentHelpedUser)
  const [sufficientVolume, setSufficientVolume] = useState(true)
  const opacityAnim = useRef(new Animated.Value(0)).current

  const loop = Animated.loop(
    Animated.sequence([
      Animated.timing(opacityAnim, {
        toValue: 1,
        useNativeDriver: true,
        duration: 500,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        useNativeDriver: true,
        duration: 500,
      }),
    ])
  )
  useEffect(() => {
    if (!sufficientVolume) {
      loop.start()
    } else {
      loop.stop()
    }
  }, [sufficientVolume])
  useEffect(() => {
    Setting.getVolume().then(volume => {
      console.log('volume', volume, helpedUser)

      if (volume < helpedUser.min_volume - 0.1) {
        setSufficientVolume(false)
      }
    })
    const unsubscribe = Setting.addVolumeListener(data => {
      console.log('volume', data)
      const volume = data.value
      if (volume < helpedUser.min_volume - 0.1) {
        setSufficientVolume(false)
      } else {
        setSufficientVolume(true)
      }
    })
    return () => {
      Setting.removeListener(unsubscribe)
    }
  }, [helpedUser.min_volume])
  if (sufficientVolume) {
    return null
  }
  return (
    <View style={{ position: 'absolute', left: 124, bottom: 24 }}>
      <Animated.View
        style={{
          opacity: opacityAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.1],
          }),
          zIndex: 30,
        }}
      >
        <Text>hihi</Text>
        <IconButton
          icon="volume-off"
          color="rgba(255,0,0,0.8)"
          size={100}
          style={{
            width: 100,
            height: 100,
            zIndex: 30,
          }}
          onPress={() => {
            console.log('set volume', helpedUser.min_volume)
            Setting.setVolume(helpedUser.min_volume)
            setSufficientVolume(true)
          }}
        />
      </Animated.View>
    </View>
  )
}

export default SystemVolumeManager
