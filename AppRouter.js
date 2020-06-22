import React from 'react'

import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from 'react-native-router-flux'
import {
  SplashScreen,
  LoginScreen,
  HomeScreen,
  SolarScreen,
  RegisterScreen,
  SleepScreen,
  ContactsList,
  VideoCallScreen,
} from './src/ui/screens'
import { SnackBar } from './src/ui/components'
import VideoCallWaiter from './src/ui/components/VideoCallWaiter'
import VideoReceivingScreen from './src/ui/screens/videoReceivingScreen'
import UserSettingsScreen from './src/ui/screens/userSettings'

export default () => (
  <React.Fragment>
    <SnackBar />
    <VideoCallWaiter />
    <Router>
      <Scene key="master" hideNavBar transitionConfig={transitionConfig}>
        <Scene
          key="splash"
          hideNavBar
          initial
          component={SplashScreen}
          type={ActionConst.RESET}
        />
        <Scene key="login" type={ActionConst.RESET}>
          <Scene key="login" hideNavBar component={LoginScreen} initial />
          <Scene
            key="register"
            path="/register/:step"
            hideNavBar
            component={RegisterScreen}
          />
        </Scene>
        <Scene key="sleep" component={SleepScreen} type={ActionConst.RESET} />

        <Stack key="root" type={ActionConst.REPLACE}>
          <Scene key="accueil" hideNavBar component={SolarScreen} initial />
          <Scene key="home" hideNavBar component={HomeScreen} />
          <Scene key="contactsList" hideNavBar component={ContactsList} />
          <Scene key="videoCall" hideNavBar component={VideoCallScreen} />
          <Scene key="userSettings" hideNavBar component={UserSettingsScreen} />
          <Scene
            key="receivingScreen"
            hideNavBar
            component={VideoReceivingScreen}
          />
        </Stack>
      </Scene>
    </Router>
  </React.Fragment>
)

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
