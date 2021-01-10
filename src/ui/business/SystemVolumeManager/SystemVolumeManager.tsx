import {
  View,
  Animated,
  Alert,
  Modal,
  useWindowDimensions,
  StyleSheet,
} from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Setting from 'react-native-system-setting'
import { useSelector } from 'react-redux'
import { AuthSelectors } from 'store/auth'
import { IconButton } from 'react-native-paper'
import { Text } from 'react-native-svg'
import { useAppState, useDimensions } from '@react-native-community/hooks'
import { modalStyles } from 'ui/components/loader/Loader'
import ProgressBar from 'react-native-progress/Bar'
import AppStyles from 'config/styles'
import { getGradientColors } from 'utils/colors'
import { moments, times } from 'utils'
import moment from 'moment'

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

  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (!sufficientVolume) {
      loop.start()
      setTimeout(() => {
        Setting.setVolume(helpedUser.min_volume)
        setProgress(helpedUser.min_volume)
      }, 1000)
      setTimeout(() => {
        setSufficientVolume(true)
      }, 2000)
    } else {
      loop.stop()
    }
  }, [sufficientVolume])
  const appState = useAppState()

  useEffect(() => {
    console.log(appState)
    Setting.getVolume().then(volume => {
      setProgress(volume)
      if (volume < helpedUser.min_volume - 0.1) {
        setSufficientVolume(false)
      } else {
        setSufficientVolume(true)
      }
    })
  }, [helpedUser.min_volume, appState])

  const time = times(moment(), helpedUser)
  const color = getGradientColors(time)[0]
  const window = useDimensions()
  console.log('progress', progress, color)

  return (
    <Modal transparent visible={!sufficientVolume} pointerEvents="none">
      <View style={modalStyles.modalBackground}>
        <View
          style={{
            paddingHorizontal: 32,
            paddingVertical: 16,
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: window.window.width / 2,
          }}
        >
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
              color={color}
              size={60}
              style={{
                width: 60,
                height: 60,
                zIndex: 30,
              }}
            />
          </Animated.View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
            }}
          >
            <ProgressBar
              useNativeDriver
              color={color}
              height={10}
              width={null}
              progress={progress}
              style={{ width: null }}
              borderColor="transparent"
              unfilledColor="rgba(255,255,255,0.4)"
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default SystemVolumeManager
