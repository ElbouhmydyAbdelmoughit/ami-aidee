import { AuthSelectors } from '../auth'

const getMyUid = state => {
  const userId = AuthSelectors.getUserId(state)
  if (!userId) {
    return null
  }
  return userId
}

const getMyUidStr = state => {
  const userId = AuthSelectors.getUserId(state)
  if (!userId) {
    return null
  }
  return userId.toString()
}

const getRemoteAuxiliary = (state, remoteId) => {
  const auxiliaries = state.auxiliary.list
  return Object.values(auxiliaries).find(
    auxiliary => auxiliary.user_id === Number.parseInt(remoteId, 10)
  )
}

export default { getMyUid, getMyUidStr, getRemoteAuxiliary }
