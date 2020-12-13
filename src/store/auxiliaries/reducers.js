import { createReducer } from 'reduxsauce'
import { types } from './actions'

// TODO: normalizer link data into its own reducer
import { types as linkTypes } from '../link/actions'

const initialState = {
  list: {},
  loading: false,
  hasMore: true,
}

const startLoader = (state = initialState) => ({ ...state, loading: true })

const stopLoader = (state = initialState) => ({ ...state, loading: false })

const auxiliariesSuccess = (state = initialState, action) => {
  const { auxiliaries } = action
  const { list } = state
  const data = {}
  auxiliaries.forEach(auxiliary => {
    data[auxiliary.id] = auxiliary
  })
  return {
    ...state,
    list: { ...list, ...data },
    loading: false,
    hasMore: auxiliaries.length > 0,
  }
}

const auxiliaryCreateRequest = (state = initialState) => ({
  ...state,
  loading: true,
  auxiliaryCreateSuccess: false,
})
const auxiliaryCreateSuccess = (state = initialState, action) => {
  const { auxiliaries } = action
  const { list } = state
  const data = list
  auxiliaries.forEach(auxiliary => {
    data[auxiliary.id] = auxiliary
  })
  return {
    ...state,
    list: data,
    loading: false,
    hasMore: auxiliaries.length > 0,
  }
}
const auxiliaryCreateFailure = (state = initialState) => ({
  ...state,
  loading: false,
  auxiliaryCreateSuccess: false,
})

const auxiliaryModifyRequest = (state = initialState) => ({
  ...state,
  loading: true,
  auxiliaryModifySuccess: false,
})
const auxiliaryModifySuccess = (state = initialState, action) => {
  const { auxiliaries } = action
  const { list } = state
  const data = list
  console.log(action)
  auxiliaries.forEach(auxiliary => {
    data[auxiliary.id] = auxiliary
  })
  return {
    ...state,
    list: data,
    loading: false,
    hasMore: auxiliaries.length > 0,
  }
}
const auxiliaryModifyFailure = (state = initialState) => ({
  ...state,
  loading: false,
  auxiliaryModifySuccess: false,
})

const auxiliaryDeleteRequest = (state = initialState) => ({
  ...state,
  loading: true,
  auxiliaryDeleteSuccess: false,
})
const auxiliaryDeleteSuccess = (state = initialState, action) => {
  const { id } = action
  console.log(action)
  const { list } = state
  delete list[id]

  const auxiliaries = Object.values(list)
  console.log(state)
  const data = {}
  console.log(data)

  auxiliaries.forEach(auxiliary => {
    data[auxiliary.id] = auxiliary
  })
  return {
    ...state,
    list: data,
    loading: false,
    hasMore: auxiliaries.length > 0,
  }
}
const auxiliaryDeleteFailure = (state = initialState) => ({
  ...state,
  loading: false,
  auxiliaryDeleteSuccess: false,
})

const linkUpdateSuccess = (state = initialState, { link }) => {
  return {
    ...state,
    list: {
      ...state.list,
      [link.auxiliary_id]: {
        ...state.list[link.auxiliary_id],
        auxiliaries_helped_users: [link],
      },
    },
  }
}

export default createReducer(initialState, {
  [types.AUXILIARIES_REQUEST]: startLoader,
  [types.AUXILIARIES_SUCCESS]: auxiliariesSuccess,
  [types.AUXILIARIES_FAILURE]: stopLoader,

  [types.AUXILIARIES_CREATE_REQUEST]: auxiliaryCreateRequest,
  [types.AUXILIARIES_CREATE_SUCCESS]: auxiliaryCreateSuccess,
  [types.AUXILIARIES_CREATE_FAILURE]: auxiliaryCreateFailure,

  [types.AUXILIARIES_MODIFY_REQUEST]: auxiliaryModifyRequest,
  [types.AUXILIARIES_MODIFY_SUCCESS]: auxiliaryModifySuccess,
  [types.AUXILIARIES_MODIFY_FAILURE]: auxiliaryModifyFailure,

  [types.AUXILIARIES_DELETE_REQUEST]: auxiliaryDeleteRequest,
  [types.AUXILIARIES_DELETE_SUCCESS]: auxiliaryDeleteSuccess,
  [types.AUXILIARIES_DELETE_FAILURE]: auxiliaryDeleteFailure,

  [linkTypes.LINK_UPDATE_SUCCESS]: linkUpdateSuccess,
})
