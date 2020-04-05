import { connect } from "react-redux"
import AccountChecker from "./AccountChecker"

const getCurrentHelpedUser = ({ auth, user }) => {
  const me = auth.user
  const helpedUser = (me && me.helped_users && me.helped_users[0]) || {}
  if (user.list[helpedUser.id]) {
    // this should be the info with fresher data
    // TODO: normalize the store so there is no more need for these types of conditional fetches
    return user.list[helpedUser.id]
  }
  return helpedUser
}

export default connect(state => ({
  helpedUser: getCurrentHelpedUser(state),
}))(AccountChecker)
