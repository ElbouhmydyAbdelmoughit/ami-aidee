import { connect } from "react-redux"
import { getTranslate } from "react-localize-redux"
import SolarScreen from "./SolarScreen"

import { MessageActions } from "src/redux/message"
import { TimerSelectors } from "src/redux/timer"
import { HelpedUserActions } from "src/redux/helpedUsers"

const getDisplayName = state => {
  const me = state.auth.user
  const helpedUser = me.helped_users && me.helped_users[0]
  if (state.user.list[helpedUser.id]) {
    // this should be the info with fresher data
    // TODO: normalize the store so there is no more need for these types of conditional fetches
    return state.user.list[helpedUser.id].surname
      ? state.user.list[helpedUser.id].surname
      : state.user.list[helpedUser.id].firstname
  }
  return helpedUser.surname ? helpedUser.surname : helpedUser.firstname
}

const mapStateToProps = state => {
  const { auth, timer } = state
  return {
    me: auth.user || {},
    minuteTick: TimerSelectors.getMinuteTick({ timer }),
    displayName: getDisplayName(state),
  }
}

const mapDispatchToProps = dispatch => ({
  messagesRequest: filters => dispatch(MessageActions.messagesRequest(filters)),
  helpedUserRequest: id => dispatch(HelpedUserActions.usersRequest({ id })),
})

export default connect(mapStateToProps, mapDispatchToProps)(SolarScreen)
