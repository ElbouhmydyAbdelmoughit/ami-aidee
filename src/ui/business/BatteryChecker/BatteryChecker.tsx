import { Alert, Animated, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { IconButton } from 'react-native-paper'
import DeviceBattery from 'react-native-device-battery'
import { useDispatch, useSelector } from 'react-redux'
import { HelpedUserActions } from 'store/helpedUsers'
import { AuthSelectors } from 'store/auth'
import { useTranslation } from 'react-i18next'

const BatteryChecker = () => {
  const opacityAnim = useRef(new Animated.Value(0)).current
  const [isCharging, setIsCharging] = useState(true)
  const currentHelpedUser = useSelector(AuthSelectors.getCurrentHelpedUser)
  const dispatch = useDispatch()
  const onBatteryStateChanged = useCallback(state => {
    setIsCharging(state.charging)
  }, [])
  const { t } = useTranslation()
  useEffect(() => {
    DeviceBattery.isCharging().then((isCharging: boolean) => {
      setIsCharging(isCharging)
    })
    DeviceBattery.addListener(onBatteryStateChanged)
    return () => {
      DeviceBattery.removeListener(onBatteryStateChanged)
    }
  }, [])
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
    if (!isCharging) {
      loop.start()
      dispatch(
        HelpedUserActions.usersModifyRequest({
          id: currentHelpedUser.id,
          is_charging: false,
        })
      )
    } else {
      loop.stop()
      dispatch(
        HelpedUserActions.usersModifyRequest({
          id: currentHelpedUser.id,
          is_charging: true,
        })
      )
    }
  }, [isCharging])
  if (isCharging) {
    return null
  }
  return (
    <View style={{ position: 'absolute', left: 24, bottom: 24 }}>
      <Animated.View
        style={{
          opacity: opacityAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.1],
          }),
          zIndex: 30,
        }}
      >
        <IconButton
          icon="battery-alert"
          color="rgba(255,0,0,0.8)"
          size={100}
          style={{
            width: 100,
            height: 100,
            zIndex: 30,
          }}
          onPress={() => {
            Alert.alert(
              t(
                'modal.battery_check.alert',
                "Veuillez brancher l'alimentation de la tablette pour assurer un fonctionnement continu de l'application"
              )
            )
          }}
        />
      </Animated.View>
    </View>
  )
}

export default () => {
  const currentHelpedUser = useSelector(AuthSelectors.getCurrentHelpedUser)
  if (!currentHelpedUser.alert_on_discharge) {
    return null
  }
  return <BatteryChecker />
}
