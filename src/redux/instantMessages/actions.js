import { createAction } from '../../utils'

// Types
export const types = {
  SEND_MESSAGE_REQUEST: 'SEND_MESSAGE_REQUEST',
  SEND_MESSAGE_SUCCESS: 'SEND_MESSAGE_SUCCESS',
  INSTANT_MESSAGES_REQUEST: 'INSTANT_MESSAGES_REQUEST',
  INSTANT_MESSAGES_REQUEST_SUCCESS: 'INSTANT_MESSAGES_REQUEST_SUCCESS',
  INSTANT_MESSAGE_RECEIVED: 'INSTANT_MESSAGE_RECEIVED',
  LAST_HELPED_USERS_MESSAGES_REQUEST: 'LAST_HELPED_USERS_MESSAGES_REQUEST',
  LOADED: 'LOADED',
  UPDATE_LAST_READ_REQUEST: 'UPDATE_LAST_READ_REQUEST',
}

// Actions
export default {
  sendMessage: (auxiliary, content) =>
    createAction(types.SEND_MESSAGE_REQUEST, {
      auxiliary,
      content,
    }),
  sendMessageSuccess: message =>
    createAction(types.SEND_MESSAGE_SUCCESS, {
      message,
    }),
  messagesRequest: auxiliary =>
    createAction(types.INSTANT_MESSAGES_REQUEST, {
      auxiliary,
    }),
  messagesRequestSuccess: messages =>
    createAction(types.INSTANT_MESSAGES_REQUEST_SUCCESS, {
      messages,
    }),
  messageReceived: message =>
    createAction(types.INSTANT_MESSAGE_RECEIVED, {
      message,
    }),

  lastHelpedUsersMessagesRequest: auxiliaries =>
    createAction(types.LAST_HELPED_USERS_MESSAGES_REQUEST, {
      auxiliaries,
    }),
  updateLastReadRequest: auxiliary =>
    createAction(types.UPDATE_LAST_READ_REQUEST, {
      auxiliary,
    }),
}
