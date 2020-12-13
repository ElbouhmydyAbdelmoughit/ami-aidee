import { createSelector } from 'reselect'
import {
  messageToAlert,
  immediateMessage,
  getMessageNextDiffusionDatetime,
} from 'src/utils'
import TimerSelectors from '../timer/selectors'

const getMessages = state => {
  return state.message.list
}

const getAlertedMessagesIds = state => state.message.alerted
const getImmediateAlertedMessagesIds = state => state.message.immediate_alerted

const getMessageNextDiffusionDateSelector = message =>
  createSelector(TimerSelectors.getMinuteTick, tick => {
    return getMessageNextDiffusionDatetime(message, tick)
  })

const MessageSelectors = {
  getMessages,
  getImmediateMessage: createSelector(
    getMessages,
    getImmediateAlertedMessagesIds,
    TimerSelectors.getMinuteTick,
    immediateMessage
  ),
  getNextMessageToAlert: createSelector(
    getMessages,
    getAlertedMessagesIds,
    TimerSelectors.getMinuteTick,
    (messages, alerted, tick) => {
      const newMessageToAlert = messageToAlert(messages, alerted, tick)
      return newMessageToAlert
    }
  ),
  getMessageNextDiffusionDate: getMessageNextDiffusionDateSelector,
}

export default MessageSelectors
