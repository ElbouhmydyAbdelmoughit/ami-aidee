import { connect } from 'react-redux'
import VideoCallError from './VideoCallError'
import { VideoCallActions } from '../../../store/videoCall'

export default connect(null, dispatch => ({
  errorAcknowledged: () => dispatch(VideoCallActions.errorAcknowledged()),
}))(VideoCallError)
