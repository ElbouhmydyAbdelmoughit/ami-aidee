import moment from 'core/moment'
import React, { useEffect,useState } from 'react'
import { StyleSheet, Text,View } from 'react-native'

import UserAvatar from '../UserAvatar'

const styles = StyleSheet.create({
  infoText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
  },
})

const leftPad = number => {
  if (number < 10) {
    return `0${number}`
  }
  return number
}
const formatTime = time => {
  const momentTime = moment.duration(time, 'seconds')
  return `${leftPad(momentTime.minutes())}:${leftPad(momentTime.seconds())}`
}

const RemoteAudioView = ({ remoteAuxiliary }) => {
  const [timer, setTimer] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(t => t + 1)
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  })
  return (
    <View style={{ flex: 1, marginTop: 64 }}>
      <UserAvatar user={remoteAuxiliary} />
      <View style={{ marginTop: 32, alignItems: 'center' }}>
        <Text style={styles.infoText}>{formatTime(timer)}</Text>
      </View>
    </View>
  )
}

export default RemoteAudioView
