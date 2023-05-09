import { connect } from 'react-redux'

import { AuthSelectors } from '../../../store/auth'
import { HelpedUserActions } from '../../../store/helpedUsers'
import UserSettingsScreen from './UserSettingsScreen'

export default connect(
  state => ({
    currentHelpedUser: AuthSelectors.getCurrentHelpedUser(state),
  }),
  dispatch => ({
    userModifyRequest: user =>
      dispatch(HelpedUserActions.usersModifyRequest(user)),
  })
)(UserSettingsScreen)
