import { Alert, Animated, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { IconButton } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { HelpedUserActions } from 'store/helpedUsers'
import { AuthSelectors } from 'store/auth'
import { useTranslation } from 'react-i18next'
import { usePowerState } from 'react-native-device-info'

const BatteryChecker = () => {
  const opacityAnim = useRef(new Animated.Value(0)).current
  const currentHelpedUser = useSelector(AuthSelectors.getCurrentHelpedUser)
  const dispatch = useDispatch()

  const { t } = useTranslation()

  const powerState = usePowerState()

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
    if (powerState.batteryState === 'unplugged') {
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
  }, [powerState.batteryState])

  if (powerState.batteryState !== 'unplugged') {
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
