import { createReducer } from 'reduxsauce'
import { types } from './actions'

const initialState = {
  list: {},
  loading: false,
  hasMore: true,
}

const startLoader = (state = initialState) => ({ ...state, loading: true })

const stopLoader = (state = initialState) => ({ ...state, loading: false })

const usersSuccess = (state = initialState, action) => {
  const { users } = action
  const { list } = state
  const data = {}
  users.forEach(user => {
    data[user.id] = user
  })
  return {
    ...state,
    list: { ...list, ...data },
    loading: false,
    hasMore: users.length > 0,
  }
}

const userCreateSuccess = (state = initialState, action) => {
  const { users } = action
  const { list } = state
  const data = list
  users.forEach(user => {
    data[user.id] = user
  })

  return { ...state, list: data, loading: false, hasMore: users.length > 0 }
}

const userModifySuccess = (state = initialState, action) => {
  const { users } = action
  const { list } = state
  const data = list
  console.log('reducer modify')
  console.log(data)
  users.forEach(user => {
    data[user.id] = user
  })

  return { ...state, list: data, loading: false, hasMore: users.length > 0 }
}

const deleteSuccess = (state = initialState, action) => {
  const { id } = action
  console.log(action)
  const { list } = state
  delete list[id]

  const users = Object.values(list)
  console.log(state)
  const data = {}
  console.log(data)

  users.forEach(user => {
    data[user.id] = user
  })
  return { ...state, list: data, loading: false, hasMore: users.length > 0 }
}

export default createReducer(initialState, {
  [types.USERS_REQUEST]: startLoader,
  [types.USERS_SUCCESS]: usersSuccess,
  [types.USERS_FAILURE]: stopLoader,

  [types.USERS_MODIFY_REQUEST]: startLoader,
  [types.USERS_MODIFY_SUCCESS]: userModifySuccess,

  [types.USERS_CREATE_REQUEST]: startLoader,
  [types.USERS_CREATE_SUCCESS]: userCreateSuccess,

  [types.USERS_DELETE_REQUEST]: startLoader,
  [types.USERS_DELETE_SUCCESS]: deleteSuccess,
})
