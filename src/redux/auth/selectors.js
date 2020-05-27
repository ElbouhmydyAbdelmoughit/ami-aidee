const getUserId = state => state.auth && state.auth.user && state.auth.user.id

const AuthSelectors = {
  getUserId,
}

export default AuthSelectors
