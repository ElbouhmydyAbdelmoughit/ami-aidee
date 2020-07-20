import React, { useEffect, forwardRef, useImperativeHandle } from 'react'
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native'
import { Actions } from 'react-native-router-flux'

import {
  ECO_FRIENDLY_SCREENS,
  SCREENSAVING_DURATION,
  WAKEUP_DURATION,
} from 'src/utils/constant'

let currentMode = 'sleep'
let duration = SCREENSAVING_DURATION
let timerIdentifier = null

const timerAction = () => {
  console.log('timer ended')
  console.log(`timer was in ${currentMode} mode`)
  switch (currentMode) {
    case 'awake': {
      console.log('sleeping')
      if (ECO_FRIENDLY_SCREENS.indexOf(Actions.currentScene) !== -1) {
        Actions.sleep()
      } else {
        setTimeout(timerAction, SCREENSAVING_DURATION)
      }
      //currentMode = "sleep"
      // duration = WAKEUP_DURATION
      //startTimer()
      break
    }
    case 'sleep':
      console.log('imm backk')
      Actions.root()
      // currentMode = "awake"
      // duration = SCREENSAVING_DURATION
      // startTimer()
      break
    default:
      break
  }
}

const startTimer = mode => {
  console.log('startTimer')
  switch (mode) {
    case 'awake':
      currentMode = mode
      duration = SCREENSAVING_DURATION
      break

    case 'sleep':
      currentMode = mode
      duration = WAKEUP_DURATION
      break
    default:
      break
  }
  timerIdentifier = setTimeout(timerAction, duration)
}

const resetTimer = () => {
  if (timerIdentifier) clearTimeout(timerIdentifier)
  startTimer(currentMode)
}

const Timer = ({ user, mode }, ref) => {
  console.log(mode)

  useImperativeHandle(ref, () => ({
    reset: () => {
      resetTimer()
    },
  }))

  if (currentMode !== mode) {
    if (timerIdentifier) clearTimeout(timerIdentifier)
    startTimer(mode)
  }

  return <></>
}

export default forwardRef(Timer)
