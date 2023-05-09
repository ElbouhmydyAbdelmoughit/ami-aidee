import { connect } from 'react-redux'

import { AuthActions } from '../../../../store/auth'
import ForgetPasswordForm from './ForgetPasswordForm'

export default connect(null, dispatch => ({
  requestPasswordReset: (...args) =>
    dispatch(AuthActions.passwordResetRequest(...args)),
}))(ForgetPasswordForm)
