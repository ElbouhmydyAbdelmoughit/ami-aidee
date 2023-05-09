import { connect } from 'react-redux'
import { HelpedUserActions } from 'src/store/helpedUsers'
import { MessageActions } from 'src/store/message'
import { TimerSelectors } from 'src/store/timer'

import { AuthActions } from '../../../store/auth'
import { AuxiliarySelectors } from '../../../store/auxiliaries'
import {
  InstantMessagesActions,
  InstantMessagesSelectors,
} from '../../../store/instantMessages'
import SolarScreen from './SolarScreen'

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

const getDisplayName = state => {
  const helpedUser = getHelpedUser(state)
  if (!helpedUser) {
    return ''
  }
  return helpedUser.surname ? helpedUser.surname : helpedUser.firstname
}

const mapStateToProps = state => {
  const { auth, timer } = state
  return {
    me: auth.user || {},
    minuteTick: TimerSelectors.getMinuteTick({ timer }),
    displayName: getDisplayName(state),
    helpedUser: getHelpedUser(state),
    helpedUserId:
      auth.user &&
      auth.user.helped_users &&
      auth.user.helped_users[0] &&
      auth.user.helped_users[0].id,
    auxiliaries: AuxiliarySelectors.getMyAuxiliaries(state),
    hasNewMessage: InstantMessagesSelectors.hasNewMessage(state),
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(AuthActions.logout()),
  messagesRequest: filters => dispatch(MessageActions.messagesRequest(filters)),
  helpedUserRequest: id => dispatch(HelpedUserActions.usersRequest({ id })),
  instantMessagesRequest: auxiliaries =>
    dispatch(
      InstantMessagesActions.lastHelpedUsersMessagesRequest(auxiliaries)
    ),
})

export default connect(mapStateToProps, mapDispatchToProps)(SolarScreen)
