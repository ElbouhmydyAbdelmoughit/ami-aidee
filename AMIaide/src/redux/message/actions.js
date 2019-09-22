import { createAction } from '../../utils';

// Types
export const types = {
  MESSAGES_CREATE_REQUEST: 'MESSAGES_CREATE_REQUEST',
  MESSAGES_CREATE_SUCCESS: 'MESSAGES_CREATE_SUCCESS',
  MESSAGES_CREATE_FAILURE: 'MESSAGES_CREATE_FAILURE',
  MESSAGES_REQUEST: 'MESSAGES_REQUEST',
  MESSAGES_FAILURE: 'MESSAGES_FAILURE',
  MESSAGES_SUCCESS: 'MESSAGES_SUCCESS'
};

// Actions
export default {
  /** REQUEST */
  messagesRequest: (filters = {}) =>
    createAction(types.MESSAGES_REQUEST, {filters}),

  messagesSuccess: (messages) =>
    createAction(types.MESSAGES_SUCCESS, {messages}),

  messagesFailure: () =>
    createAction(types.MESSAGES_FAILURE),

  /** CREATE */
  messageCreateRequest: (data = {}) =>
    createAction(types.MESSAGES_CREATE_REQUEST, {data}),

  messageCreateSuccess: (messages) =>
    createAction(types.MESSAGES_CREATE_SUCCESS,{messages}),

  messageCreateFailure: () =>
    createAction(types.MESSAGES_CREATE_FAILURE),
};
