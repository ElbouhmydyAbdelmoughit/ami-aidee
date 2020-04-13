import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MessageSelectors, MessageActions } from 'src/redux/message'
import { Actions } from 'react-native-router-flux'

const MessageAlertManager = () => {
  const immediateMessage = useSelector(MessageSelectors.getImmediateMessage)
  const messageToAlert = useSelector(MessageSelectors.getNextMessageToAlert)
  const dispatch = useDispatch()
  useEffect(() => {
    if (immediateMessage) {
      console.log('message happening now', immediateMessage)
      if (Actions.currentScene === 'accueil') {
        Actions.home({ redirectFromSolarView: true })
        dispatch(MessageActions.immediateMessageAlerted(immediateMessage.id))
      }
      return
    }
    if (messageToAlert) {
      console.log('new message to alert', messageToAlert)
      if (Actions.currentScene === 'accueil') {
        Actions.home({ redirectFromSolarView: true })
        dispatch(MessageActions.messageAlerted(messageToAlert.id))
      }
      return
    }
    console.log('no new message')
  }, [immediateMessage, messageToAlert])

  return null
}

export default MessageAlertManager
