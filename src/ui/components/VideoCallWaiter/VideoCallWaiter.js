import { useEffect } from 'react'
import { Actions } from 'react-native-router-flux'

const VideoCallWaiter = ({ myUid, videoCallInit, dispatch, incomingCall }) => {
  useEffect(() => {
    if (!myUid) {
      return
    }
    videoCallInit({ dispatch })
  }, [myUid])

  useEffect(() => {
    if (incomingCall) {
      Actions.root()
      Actions.receivingScreen()
    }
  }, [incomingCall])
  return null
}

export default VideoCallWaiter
