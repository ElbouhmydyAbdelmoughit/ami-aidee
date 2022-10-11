import React, { useCallback, useEffect, useState } from 'react'

import { Scene, Router, ActionConst, Stack } from 'react-native-router-flux'
import {
  SplashScreen,
  LoginScreen,
  HomeScreen,
  SolarScreen,
  RegisterScreen,
  SleepScreen,
  ContactsList,
  VideoCallScreen,
  PasswordResetRequestScreen,
  PasswordResetRequestConfirmedScreen,
  ResetPasswordScreen,
  ResetPasswordConfirmedScreen,
} from 'ui/screens'
import { SnackBar } from 'ui/components'
import RemoteEventReceiver from 'ui/components/RemoteEventReceiver'
import VideoReceivingScreen from 'ui/screens/videoReceivingScreen'
import UserSettingsScreen from 'ui/screens/userSettings'
import MessagingScreen from 'ui/screens/messagingScreen'
import SystemVolumeManager from 'ui/business/SystemVolumeManager'
import BatteryChecker from 'ui/business/BatteryChecker'
import { useDispatch } from 'react-redux'
import { NavigationActions } from 'store/navigation'
import { StatusBar } from 'react-native'

export default () => {
  const [key, setKey] = useState(0)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(NavigationActions.initializeApplicationLanguage())
  }, [])

  const renderSplashScreen = useCallback(
    props => <SplashScreen {...props} />,
    []
  )
  return (
    <React.Fragment key={key}>
      <StatusBar backgroundColor="transparent" translucent />
      <SnackBar />
      <RemoteEventReceiver />
      <Router>
        <Scene key="master" hideNavBar transitionConfig={transitionConfig}>
          <Scene
            key="splash"
            hideNavBar
            initial
            component={renderSplashScreen}
            type={ActionConst.RESET}
          />
          <Scene key="login" type={ActionConst.RESET}>
            <Scene
              key="login"
              hideNavBar
              component={props => (
                <LoginScreen
                  {...props}
                  onRefresh={() => {
                    setKey(k => k + 1)
                  }}
                />
              )}
              initial
            />
            <Scene
              key="register"
              path="/register/:step"
              hideNavBar
              component={RegisterScreen}
            />
            <Scene
              key="passwordResetRequest"
              hideNavBar
              component={PasswordResetRequestScreen}
            />
            <Scene
              key="passwordResetRequestConfirmed"
              hideNavBar
              component={PasswordResetRequestConfirmedScreen}
            />

            <Scene
              key="resetPassword"
              hideNavBar
              component={ResetPasswordScreen}
            />
            <Scene
              key="resetPasswordConfirmed"
              hideNavBar
              component={ResetPasswordConfirmedScreen}
            />
          </Scene>
          <Scene key="sleep" component={SleepScreen} type={ActionConst.RESET} />

          <Stack key="root" type={ActionConst.REPLACE}>
            <Scene key="accueil" initial hideNavBar component={SolarScreen} />
            <Scene key="home" hideNavBar component={HomeScreen} />
            <Scene key="contactsList" hideNavBar component={ContactsList} />
            <Scene key="videoCall" hideNavBar component={VideoCallScreen} />
            <Scene
              key="userSettings"
              hideNavBar
              component={UserSettingsScreen}
            />
            <Scene key="messaging" hideNavBar component={MessagingScreen} />
          </Stack>
          <Scene
            key="receivingScreen"
            hideNavBar
            component={VideoReceivingScreen}
          />
        </Scene>
      </Router>
      <SystemVolumeManager />
      <BatteryChecker />
    </React.Fragment>
  )
}

const MyTransitionSpec = {
  duration: 1000,
  // easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
  // timing: Animated.timing,
}

const transitionConfig = () => ({
  transitionSpec: MyTransitionSpec,
  // screenInterpolator: StackViewStyleInterpolator.forFadeFromBottomAndroid,
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps
    const { index } = scene
    const width = layout.initWidth

    //right to left by replacing bottom scene
    // return {
    //     transform: [{
    //         translateX: position.interpolate({
    //             inputRange: [index - 1, index, index + 1],
    //             outputRange: [width, 0, -width],
    //         }),
    //     }]
    // };

    /*  left to right
      const inputRange = [index - 1, index, index + 1];

      const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 0]),
      });

      const translateX = position.interpolate({
          inputRange,
          outputRange: ([width, 0, 0]),
      });

      return {
          opacity,
          transform: [
              { translateX }
          ],
      };*/

    //from center to corners
    const inputRange = [index - 1, index, index + 1]
    const opacity = position.interpolate({
      inputRange,
      outputRange: [0.8, 1, 1],
    })

    const scaleY = position.interpolate({
      inputRange,
      outputRange: [0.8, 1, 1],
    })

    return {
      opacity,
      transform: [{ scaleY }],
    }
  },
})
