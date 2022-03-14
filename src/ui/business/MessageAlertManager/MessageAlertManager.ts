import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MessageSelectors, MessageActions } from 'store/message'
import { Actions } from '@ami-app/react-native-router-flux'
import { ReturnToHomeState } from 'store/navigation/actions'

const MessageAlertManager = ({
  onRedirect,
}: {
  onRedirect: (returnState: ReturnToHomeState) => void
}) => {
  const immediateMessage = useSelector(MessageSelectors.getImmediateMessage)
  const messageToAlert = useSelector(MessageSelectors.getNextMessageToAlert)
  const dispatch = useDispatch()
  const redirect = (returnToHomeState: ReturnToHomeState) => {
    if (onRedirect) {
      onRedirect(returnToHomeState)
    }
    Actions.home({ redirectFromSolarView: true, returnToHomeState })
  }
  useEffect(() => {
    if (immediateMessage) {
      if (Actions.currentScene !== 'home') {
        redirect('after_2_min')
        // dispatch(MessageActions.immediateMessageAlerted(immediateMessage.id))
      }
      return
    }
    if (messageToAlert) {
      if (Actions.currentScene !== 'home') {
        redirect('after_1_min')
        //  dispatch(MessageActions.messageAlerted(messageToAlert.id))
      }
      return
    }
  }, [immediateMessage, messageToAlert])

  return null
}

export default MessageAlertManager
