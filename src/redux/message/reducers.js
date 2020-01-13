import { createReducer } from "reduxsauce"
import { types } from "./actions"

const initialState = {
  list: {},
  alerted: [],
  immediate_alerted: [],
  loading: false,
  createSuccess: false,
  hasMore: true,
}

const startLoader = (state = initialState) => ({ ...state, loading: true })

const stopLoader = (state = initialState) => ({ ...state, loading: false })

const messagesSuccess = (state = initialState, action) => {
  console.log("messagesSuccess")
  const { messages } = action
  const { list } = state
  const data = {}
  console.log(messages)
  messages.forEach(message => {
    data[message.id] = message
  })
  return {
    ...state,
    list: data,
    loading: false,
    hasMore: messages.length > 0,
  }
}

const messageCreateRequest = (state = initialState) => ({
  ...state,
  loading: true,
  createSuccess: false,
})

const messageCreateSuccess = (state = initialState, action) => {
  console.log("messageCreateSuccess")
  const { messages } = action
  const { list } = state
  const data = list
  console.log(messages)
  messages.forEach(msg => {
    data[msg.id] = msg
  })

  return {
    ...state,
    list: data,
    loading: false,
    createSuccess: true,
    hasMore: messages.length > 0,
  }
}

const messageCreateFailure = (state = initialState) => ({
  ...state,
  loading: false,
  createSuccess: false,
})

const messageAlerted = (state = initialState, action) => ({
  ...state,
  alerted: [...(state.alerted || []), action.id],
})

const immediateMessageAlerted = (state = initialState, action) => ({
  ...state,
  immediate_alerted: [...(state.immediate_alerted || []), action.id],
})

export default createReducer(initialState, {
  [types.MESSAGES_REQUEST]: startLoader,
  [types.MESSAGES_SUCCESS]: messagesSuccess,
  [types.MESSAGES_FAILURE]: stopLoader,
  [types.MESSAGES_CREATE_REQUEST]: messageCreateRequest,
  [types.MESSAGES_CREATE_SUCCESS]: messageCreateSuccess,
  [types.MESSAGES_CREATE_FAILURE]: messageCreateFailure,
  [types.MESSAGE_ALERTED]: messageAlerted,
  [types.IMMEDIATE_MESSAGE_ALERTED]: immediateMessageAlerted,
})
