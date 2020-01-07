import moment from "moment"
import { createSelector } from "reselect"
import TimerSelectors from "../timer/selectors"
import { messageToAlert, immediateMessage } from "src/utils"

const getMessages = state => {
  return state.message.list
}

const getAlertedMessagesIds = state => state.message.alerted
const getImmediateAlertedMessagesIds = state => state.message.immediate_alerted

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
}

export default MessageSelectors
