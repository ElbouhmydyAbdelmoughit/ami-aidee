import { connect } from 'react-redux'
import { AuthActions } from '../../../../redux/auth'
import PasswordForm from './PasswordForm'

export default connect(null, dispatch => ({
  modifyPasswordUsingResetCodeRequest: (...args) =>
    dispatch(AuthActions.modifyPasswordUsingResetCodeRequest(...args)),
}))(PasswordForm)
