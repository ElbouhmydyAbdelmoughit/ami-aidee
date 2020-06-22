import { connect } from 'react-redux'
import UserSettingsScreen from './UserSettingsScreen'
import { HelpedUserActions } from '../../../redux/helpedUsers'
import { AuthSelectors } from '../../../redux/auth'

export default connect(
  state => ({
    currentHelpedUser: AuthSelectors.getCurrentHelpedUser(state),
  }),
  dispatch => ({
    userModifyRequest: user =>
      dispatch(HelpedUserActions.usersModifyRequest(user)),
  })
)(UserSettingsScreen)
