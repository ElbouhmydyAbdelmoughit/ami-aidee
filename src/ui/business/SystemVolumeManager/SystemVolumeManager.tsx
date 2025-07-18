import { useAppState, useDimensions } from '@react-native-community/hooks'
import AppStyles from 'config/styles'
import moment from 'core/moment'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, Modal, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import ProgressBar from 'react-native-progress/Bar'
import { Text } from 'react-native-svg'
import Setting from 'react-native-system-setting'
import { useSelector } from 'react-redux'
import { AuthSelectors } from 'store/auth'
import { modalStyles } from 'ui/components/loader/Loader'
import useDebounce from 'ui/hooks/use-debounce'
import { times } from 'utils'
import { getGradientColors } from 'utils/colors'

const SystemVolumeManager = () => {
  const helpedUser = useSelector(AuthSelectors.getCurrentHelpedUser)
  const [sufficientVolume, setSufficientVolume] = useState(true)
  const sufficientVolumeDebounced = useDebounce(sufficientVolume, 3000)
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
        setSufficientVolume(true)
      }, 3000)
    } else {
      loop.stop()
    }
  }, [sufficientVolume])

  const appState = useAppState()

  const onNewVolume = (volume: number) => {
    console.log('newVolume', volume)
    if (!helpedUser.min_volume) {
      return
    }
    setProgress(volume)
    if (volume < helpedUser.min_volume - 0.1) {
      setSufficientVolume(false)
    } else {
      setSufficientVolume(true)
    }
  }
  useEffect(() => {
    Setting.getVolume().then(volume => {
      onNewVolume(volume)
    })
  }, [helpedUser.min_volume, appState])

  useEffect(() => {
    const listener = Setting.addVolumeListener(volumeData => {
      onNewVolume(volumeData.value)
    })

    return () => {
      Setting.removeVolumeListener(listener)
    }
  }, [helpedUser.min_volume])

  const time = times(moment(), helpedUser)
  const color = sufficientVolume
    ? getGradientColors(time)[0]
    : AppStyles.colors.danger
  const window = useDimensions()

  return (
    <Modal
      transparent
      visible={!sufficientVolume || !sufficientVolumeDebounced}
      pointerEvents={'none'}
    >
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
              icon={'volume-off'}
              iconColor={color}
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
              borderColor={'transparent'}
              unfilledColor={'rgba(255,255,255,0.4)'}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default SystemVolumeManager
