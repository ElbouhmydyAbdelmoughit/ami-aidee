import { call, put,select, takeLatest } from 'redux-saga/effects'

import { LinkService } from '../../services'
import InstantMessagesService from '../../services/instantMessages'
import { getCurrentTopic } from '../../utils/instantMessage'
import { AuthSelectors } from '../auth'
import { LinkActions } from '../link'
import InstantMessagesActions, { types } from './actions'

function* sendMessage({ auxiliary, content }) {
  const currentUserId = yield select(AuthSelectors.getUserId)
  const correspondingTopic = yield select(getCurrentTopic(auxiliary))
  const [, response] = yield call(InstantMessagesService.createMessage, {
    sender_id: currentUserId,
    receiver_id: auxiliary.user_id,
    topic_id: correspondingTopic.id,
    content,
  })
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
  const [error, response] = yield call(
    InstantMessagesService.lastHelpedUsersMessages,
    {
      receiver_id: currentUserId,
      sender_ids: auxiliaries.map(auxiliary => auxiliary.user_id),
    }
  )
  if (error) {
    // TODO: display error messages ?
    return
  }
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
