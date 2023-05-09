import { useEffect,useRef } from 'react'
import { AppState } from 'react-native'

const MessageUpdater = ({ messagesRequest }) => {
  const appState = useRef(AppState.currentState)

  const handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!')
      messagesRequest()
    }

    appState.current = nextAppState
    console.log('AppState', appState.current)
  }

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange)

    return () => {
      AppState.removeEventListener('change', handleAppStateChange)
    }
  }, [])

  return null
}
export default MessageUpdater
