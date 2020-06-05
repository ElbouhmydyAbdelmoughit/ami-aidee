import Sound from 'react-native-sound'

const playHangupTone = () => {
  const hangupTone = new Sound('hangup.wav', Sound.MAIN_BUNDLE, error => {
    if (error) {
      // TODO: log to sentry
      return
    }
    hangupTone.play()
  })
}

export { playHangupTone }
