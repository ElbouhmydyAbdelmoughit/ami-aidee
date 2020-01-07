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
    list: {
      ...data,
      "998": {
        id: 998,
        subjet: "0",
        activite: "Bonjour ",
        location: "Bonjour ",
        moment: "0",
        moment_time: "23:46:00",
        reccurence: null,
        updated_at: null,
        created_at: null,
        diffusion_start_date: "2020-01-07T00:00:00",
        diffusion_end_date: "2020-01-07T00:00:00",
        picture_url: "photo_296d4bd5-6596-4c3b-b098-2eb72ba7efa9",
        video_url: "video_f526212b-e0da-470a-9a23-53887ea45341.mp4",
        auxiliary: {
          id: 3,
          firstname: "test",
          lastname: "test",
          __typename: "auxiliaries",
        },
      },
    },
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
