import { connect } from 'react-redux'

import { VideoCallActions } from '../../../store/videoCall'
import VideoCallError from './VideoCallError'

export default connect(null, dispatch => ({
  errorAcknowledged: () => dispatch(VideoCallActions.errorAcknowledged()),
}))(VideoCallError)
