import { takeLatest, call, select, put } from 'redux-saga/effects'
import InstantMessagesActions, { types } from './actions'
import InstantMessagesService from '../../services/instantMessages'
import { AuthSelectors } from '../auth'
import { getCurrentTopic } from '../../utils/instantMessage'

import { LinkService } from '../../services'
import { LinkActions } from '../link'

function* sendMessage({ auxiliary, content }) {
  const currentUserId = yield select(AuthSelectors.getUserId)
  const correspondingTopic = yield select(getCurrentTopic(auxiliary))
  const [, response] = yield call(InstantMessagesService.createMessage, {
    sender_id: currentUserId,
    receiver_id: auxiliary.user_id,
    topic_id: correspondingTopic.id,
    content,
  })
  console.log(response)
  yield put(
    InstantMessagesActions.sendMessageSuccess(
      response.insert_instant_messages.returning[0]
    )
  )
}

function* messagesRequest({ auxiliary }) {
  const correspondingTopic = yield select(getCurrentTopic(auxiliary))
  const [, response] = yield call(InstantMessagesService.latestMessages, {
    topicId: correspondingTopic.id,
  })
  yield put(
    InstantMessagesActions.messagesRequestSuccess(response.instant_messages)
  )
}

function* lastHelpedUsersMessagesRequest({ auxiliaries }) {
  const currentUserId = yield select(AuthSelectors.getUserId)
  const [, response] = yield call(
    InstantMessagesService.lastHelpedUsersMessages,
    {
      receiver_id: currentUserId,
      sender_ids: auxiliaries.map(auxiliary => auxiliary.user_id),
    }
  )
  yield put(InstantMessagesActions.messagesRequestSuccess(response))
}

function* updateLastReadRequest({ auxiliary }) {
  const correspondingTopic = yield select(getCurrentTopic(auxiliary))
  const [, response] = yield call(
    LinkService.updateReadStatus,
    correspondingTopic.id
  )
  yield put(LinkActions.linkUpdateSuccess(response))
}

export default [
  takeLatest(types.SEND_MESSAGE_REQUEST, sendMessage),
  takeLatest(types.INSTANT_MESSAGES_REQUEST, messagesRequest),

  takeLatest(
    types.LAST_HELPED_USERS_MESSAGES_REQUEST,
    lastHelpedUsersMessagesRequest
  ),
  takeLatest(types.UPDATE_LAST_READ_REQUEST, updateLastReadRequest),
]
