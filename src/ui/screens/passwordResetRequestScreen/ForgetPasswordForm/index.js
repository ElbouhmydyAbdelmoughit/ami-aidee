import { connect } from 'react-redux'
import ForgetPasswordForm from './ForgetPasswordForm'
import { AuthActions } from '../../../../store/auth'

export default connect(null, dispatch => ({
  requestPasswordReset: (...args) =>
    dispatch(AuthActions.passwordResetRequest(...args)),
}))(ForgetPasswordForm)
