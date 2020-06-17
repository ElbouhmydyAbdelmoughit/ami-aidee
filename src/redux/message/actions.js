import { createAction } from '../../utils'
import { getDatestamp } from '../../utils/time'

// Types
export const types = {
  MESSAGES_CREATE_REQUEST: 'MESSAGES_CREATE_REQUEST',
  MESSAGES_CREATE_SUCCESS: 'MESSAGES_CREATE_SUCCESS',
  MESSAGES_CREATE_FAILURE: 'MESSAGES_CREATE_FAILURE',
  MESSAGES_REQUEST: 'MESSAGES_REQUEST',
  MESSAGES_FAILURE: 'MESSAGES_FAILURE',
  MESSAGES_SUCCESS: 'MESSAGES_SUCCESS',
  MESSAGE_ALERTED: 'MESSAGE_ALERTED',
  IMMEDIATE_MESSAGE_ALERTED: 'IMMEDIATE_MESSAGE_ALERTED',
}

// Actions
export default {
  messageAlerted: id =>
    createAction(types.MESSAGE_ALERTED, { id, datestamp: getDatestamp() }),
  immediateMessageAlerted: id =>
    createAction(types.IMMEDIATE_MESSAGE_ALERTED, {
      id,
      datestamp: getDatestamp(),
    }),
  /** REQUEST */
  messagesRequest: id => createAction(types.MESSAGES_REQUEST, { id }),

  messagesSuccess: messages =>
    createAction(types.MESSAGES_SUCCESS, { messages }),

  messagesFailure: () => createAction(types.MESSAGES_FAILURE),

  /** CREATE */
  messageCreateRequest: (data = {}) =>
    createAction(types.MESSAGES_CREATE_REQUEST, { data }),

  messageCreateSuccess: messages =>
    createAction(types.MESSAGES_CREATE_SUCCESS, { messages }),

  messageCreateFailure: () => createAction(types.MESSAGES_CREATE_FAILURE),
}
