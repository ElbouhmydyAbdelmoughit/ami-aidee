import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MessageSelectors, MessageActions } from 'store/message'
import { Actions } from 'react-native-router-flux'

const MessageAlertManager = ({ onRedirect }) => {
  const immediateMessage = useSelector(MessageSelectors.getImmediateMessage)
  const messageToAlert = useSelector(MessageSelectors.getNextMessageToAlert)
  const dispatch = useDispatch()

  const redirect = () => {
    if (onRedirect) {
      onRedirect()
    }
    Actions.home({ redirectFromSolarView: true })
  }
  useEffect(() => {
    if (immediateMessage) {
      console.log('message happening now', immediateMessage)
      if (Actions.currentScene !== 'home') {
        redirect(immediateMessage.id)
        dispatch(MessageActions.immediateMessageAlerted(immediateMessage.id))
      }
      return
    }
    if (messageToAlert) {
      console.log('new message to alert', messageToAlert)
      if (Actions.currentScene !== 'home') {
        redirect(messageToAlert.id)
        dispatch(MessageActions.messageAlerted(messageToAlert.id))
      }
      return
    }
    console.log('no new message')
  }, [immediateMessage, messageToAlert])

  return null
}

export default MessageAlertManager
