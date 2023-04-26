import { createReducer } from 'reduxsauce'
import { types } from './actions'

const initialState = {
  list: {},
  loading: false,
  hasMore: true,
}

const startLoader = (state = initialState) => ({ ...state, loading: true })

const stopLoader = (state = initialState) => ({ ...state, loading: false })

const addressesSuccess = (state = initialState, action) => {
  const { addresses } = action
  const { list } = state
  const data = {}
  addresses.forEach(address => {
    data[address.id] = address
  })
  return {
    ...state,
    list: { ...list, ...data },
    loading: false,
    hasMore: addresses.length > 0,
  }
}

const addressesCreateSuccess = (state = initialState, action) => {
  const { create } = action
  const { list } = state
  const data = list
  create.forEach(creation => {
    data[creation.id] = creation
  })
  console.log(data)
  return { ...state, list: data, loading: false, hasMore: create.length > 0 }
}

const addressesModifySuccess = (state = initialState, action) => {
  const { addresses } = action
  console.log(action)
  const { list } = state
  const data = list
  console.log(data)
  console.log(state)
  addresses.forEach(address => {
    data[address.id] = address
  })
  return { ...state, list: data, loading: false, hasMore: addresses.length > 0 }
}

const addressesDeleteSuccess = (state = initialState, action) => {
  const { id } = action
  console.log(action)
  const { list } = state
  delete list[id]

  const addresses = Object.values(list)
  console.log(addresses)
  console.log(state)
  const data = {}
  console.log(data)

  addresses.forEach(address => {
    data[address.id] = address
  })
  return { ...state, list: data, loading: false, hasMore: addresses.length > 0 }
}

export default createReducer(initialState, {
  [types.ADDRESSES_REQUEST]: startLoader,
  [types.ADDRESSES_SUCCESS]: addressesSuccess,
  [types.ADDRESSES_FAILURE]: stopLoader,

  [types.ADDRESSES_PDF_REQUEST]: startLoader,
  [types.ADDRESSES_PDF_SUCCESS]: stopLoader,

  [types.ADDRESSES_MODIFY_REQUEST]: startLoader,
  [types.ADDRESSES_MODIFY_SUCCESS]: addressesModifySuccess,

  [types.ADDRESSES_CREATE_REQUEST]: startLoader,
  [types.ADDRESSES_CREATE_SUCCESS]: addressesCreateSuccess,

  [types.ADDRESSES_DELETE_REQUEST]: startLoader,
  [types.ADDRESSES_DELETE_SUCCESS]: addressesDeleteSuccess,
})
