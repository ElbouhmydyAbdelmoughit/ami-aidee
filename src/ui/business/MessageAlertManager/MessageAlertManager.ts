import { useEffect } from 'react'
import { Actions } from 'react-native-router-flux'
import { useDispatch,useSelector } from 'react-redux'
import { MessageActions,MessageSelectors } from 'store/message'

const MessageAlertManager = ({
  onRedirect,
}: {
  onRedirect: (returnState: string) => void
}) => {
  const immediateMessage = useSelector(MessageSelectors.getImmediateMessage)
  const messageToAlert = useSelector(MessageSelectors.getNextMessageToAlert)
  const dispatch = useDispatch()
  const redirect = (returnToHomeState: string) => {
    if (onRedirect) {
      onRedirect(returnToHomeState)
    } else {
      Actions.home({ redirectFromSolarView: true, returnToHomeState })
    }
  }
  useEffect(() => {
    if (immediateMessage) {
      if (Actions.currentScene !== 'home') {
        redirect('after_2_min')
        if (!onRedirect) {
          dispatch(MessageActions.immediateMessageAlerted(immediateMessage.id))
        }
      }
      return
    }
    if (messageToAlert) {
      if (Actions.currentScene !== 'home') {
        redirect('after_1_min')
        if (!onRedirect) {
          dispatch(MessageActions.messageAlerted(messageToAlert.id))
        }
      }
    }
  }, [immediateMessage, messageToAlert])

  return null
}

export default MessageAlertManager
