import moment from 'moment'

import { getCurrentTopic } from '../../utils/instantMessage'
import { AuthSelectors } from '../auth'
import { AuxiliarySelectors } from '../auxiliaries'

const getAllMessages = state => state.instantMessage.list || {}

const getMessages = auxiliary => state => {
  const currentTopicId = getCurrentTopic(auxiliary)(state).id
  const allMessages = getAllMessages(state)
  return Object.keys(allMessages)
    .filter(messageKey => allMessages[messageKey].topic_id === currentTopicId)
    .map(key => allMessages[key])
    .sort(
      (message1, message2) =>
        new Date(message2.created_at).getTime() -
        new Date(message1.created_at).getTime()
    )
}

const newMessagesCount = auxiliary => state => {
  const currentTopic = getCurrentTopic(auxiliary)(state)
  const allMessages = getAllMessages(state)
  const currentUserId = AuthSelectors.getUserId(state)

  const isNewIncomingMessage = key => {
    return moment(allMessages[key].created_at).isAfter(
      currentTopic.helped_user_last_read
    )
  }
  return Object.keys(allMessages)
    .filter(key => allMessages[key].topic_id === currentTopic.id)
    .filter(key => allMessages[key].receiver_id === currentUserId)
    .filter(isNewIncomingMessage).length
}

const hasNewMessageForAuxiliary = auxiliary => state => {
  return newMessagesCount(auxiliary)(state) > 0
}

const hasNewMessage = state => {
  const auxiliaries = AuxiliarySelectors.getMyAuxiliaries(state)
  return auxiliaries
    .map(auxiliary => hasNewMessageForAuxiliary(auxiliary)(state))
    .some(b => b)
}

const InstantMessagesSelectors = {
  hasNewMessageForAuxiliary,
  getMessages,
  newMessagesCount,
  hasNewMessage,
}

export default InstantMessagesSelectors
