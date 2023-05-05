import type { HelpedUser } from 'core/types'

const getUserId = state => state.auth && state.auth.user && state.auth.user.id

const getCurrentHelpedUser = ({ auth, user }): HelpedUser => {
  const me = auth.user
  const helpedUser = (me && me.helped_users && me.helped_users[0]) || {}
  if (user.list[helpedUser.id]) {
    // this should be the info with fresher data
    // TODO: normalize the store so there is no more need for these types of conditional fetches
    return user.list[helpedUser.id]
  }
  return helpedUser
}

const AuthSelectors = {
  getUserId,
  getCurrentHelpedUser,
}

export default AuthSelectors
