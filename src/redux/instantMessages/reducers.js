import { createReducer } from 'reduxsauce'
import { types } from './actions'

const initialState = {
  list: {},
}

const messagesRequestSuccess = (state = initialState, { messages }) => {
  const data =
    messages &&
    messages.reduce(
      (acc, cur) => ({
        ...acc,
        [cur.id]: cur,
      }),
      {}
    )
  return {
    ...state,
    list: {
      ...state.list,
      ...data,
    },
  }
}

const sendMessageSuccess = (state = initialState, { message }) => {
  return messagesRequestSuccess(state, { messages: [message] })
}

const messageReceived = sendMessageSuccess

export default createReducer(initialState, {
  [types.INSTANT_MESSAGES_REQUEST_SUCCESS]: messagesRequestSuccess,
  [types.SEND_MESSAGE_SUCCESS]: sendMessageSuccess,
  [types.INSTANT_MESSAGE_RECEIVED]: messageReceived,
})
