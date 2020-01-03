import React, { Component, forwardRef, useImperativeHandle } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator
} from 'react-native';

const DURATION_WHEN_AWAKE = 60000 * 2
const DURATION_WHEN_SLEEP = 60000 * 15

import { Actions } from 'react-native-router-flux';


let currentMode = "sleep"
let duration = DURATION_WHEN_AWAKE
let timerIdentifier = null

const timerAction = () => {
  console.log("timer ended")
  console.log(`timer was in ${currentMode} mode`)
  switch (currentMode) {
    case "awake":
      Actions.sleep()
      //currentMode = "sleep"
      // duration = DURATION_WHEN_SLEEP
      //startTimer()
      break;

    case "sleep":
      Actions.root()
      // currentMode = "awake"
      // duration = DURATION_WHEN_AWAKE
      // startTimer()
      break;
  }
}

const startTimer = (mode) => {
  console.log("startTimer")
  switch (mode) {
    case "awake":
      currentMode = mode
      duration = DURATION_WHEN_AWAKE
      break;

    case "sleep":
      currentMode = mode
      duration = DURATION_WHEN_SLEEP
      break;
  }
  timerIdentifier = setTimeout(timerAction, duration);
}

const resetTimer = () => {
  if (timerIdentifier)
    clearTimeout(timerIdentifier)
  startTimer(currentMode)
}

const Timer = ({ user, mode }, ref) => {
  console.log(mode)

  useImperativeHandle(ref, () => ({
    reset: () => { resetTimer() }
  }))

  if (currentMode != mode) {

    console.log("start " + currentMode)
    if (timerIdentifier)
      clearTimeout(timerIdentifier)
    startTimer(mode)
  }

  return (<></>)
}

export default forwardRef(Timer)