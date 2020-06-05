import { connect } from 'react-redux'

import GradientBackground from './GradientBackground'

const getHelpedUser = state => {
  const me = state.auth.user

  const helpedUser = me && me.helped_users && me.helped_users[0]
  if (!helpedUser) {
    // this should be the info with fresher data
    // TODO: normalize the store so there is no more need for these types of conditional data retrieval
    return undefined
  }
  return state.user.list[helpedUser.id] || helpedUser
}

export default connect(state => ({
  helpedUser: getHelpedUser(state),
}))(GradientBackground)
