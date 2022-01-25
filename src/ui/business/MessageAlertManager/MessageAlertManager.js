import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MessageSelectors, MessageActions } from 'store/message'
import { Actions } from '@ami-app/react-native-router-flux'

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
      if (Actions.currentScene !== 'home') {
        redirect(immediateMessage.id)
        dispatch(MessageActions.immediateMessageAlerted(immediateMessage.id))
      }
      return
    }
    if (messageToAlert) {
      if (Actions.currentScene !== 'home') {
        redirect(messageToAlert.id)
        dispatch(MessageActions.messageAlerted(messageToAlert.id))
      }
      return
    }
  }, [immediateMessage, messageToAlert])

  return null
}

export default MessageAlertManager
