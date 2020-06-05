const getUserId = state => state.auth && state.auth.user && state.auth.user.id

const getCurrentHelpedUser = state =>
  state.auth &&
  state.auth.user &&
  state.auth.user.helped_users &&
  state.auth.user.helped_users[0]

const AuthSelectors = {
  getUserId,
  getCurrentHelpedUser,
}

export default AuthSelectors
