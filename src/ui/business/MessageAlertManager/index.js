import { connect } from 'react-redux'
import { DiffusionActions } from 'src/redux/diffusion'
import MessageAlertManager from './MessageAlertManager'

export default connect(null, dispatch => ({
  diffusionRequest: message =>
    dispatch(DiffusionActions.diffusionRequest(message)),
  prediffusionRequest: message =>
    dispatch(DiffusionActions.prediffusionRequest(message)),
}))(MessageAlertManager)
