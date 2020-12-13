import { connect } from 'react-redux'
import ResetPasswordScreen from './ResetPassWordScreen'
import {
  ResetPasswordRequestActions,
  ResetPasswordRequestSelectors,
} from '../../../store/resetPasswordRequest'

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
