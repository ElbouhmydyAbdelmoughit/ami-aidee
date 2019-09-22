import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator
} from 'react-native';

const DURATION_WHEN_AWAKE = 60000 * 5
const DURATION_WHEN_SLEEP = 60000 * 3

import { Actions } from 'react-native-router-flux';


let mode = "awake"
let duration = DURATION_WHEN_AWAKE
let timerIdentifier = null

const timerAction = () => {
  console.log("timer ended")
  console.log(`timer was in ${mode} mode`)
  switch (mode) {
    case "awake": 
    Actions.sleep()
    mode = "sleep"
    duration = DURATION_WHEN_SLEEP
    startTimer()
    break;

    case "sleep": 
    Actions.root()
    mode = "awake"
    duration = DURATION_WHEN_AWAKE
    startTimer()
    break;
  }
}

const startTimer = () => {
  console.log("startTimer")
  timerIdentifier = setTimeout(timerAction, duration);
}

export default ({user}) => {

  if (user) {
    startTimer()
  }

  return (<></>)
}
