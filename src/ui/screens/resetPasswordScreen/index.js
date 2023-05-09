import { connect } from 'react-redux'

import {
  ResetPasswordRequestActions,
  ResetPasswordRequestSelectors,
} from '../../../store/resetPasswordRequest'
import ResetPasswordScreen from './ResetPassWordScreen'

export default connect(
  (state, { data }) => ({
    loading: ResetPasswordRequestSelectors.isLoading(state),
    resetRequest: ResetPasswordRequestSelectors.getByResetCode(state, data),
  }),
  dispatch => ({
    resetPaswordRequestRequest: (...args) =>
      dispatch(ResetPasswordRequestActions.resetPaswordRequestRequest(...args)),
  })
)(ResetPasswordScreen)
