import { connect } from 'react-redux'

import { VideoCallSelectors } from '../../../store/videoCall'
import VideoCallRoom from './VideoCallRoom'

export default connect((state, ownProps) => ({
  remoteAuxiliary: VideoCallSelectors.getRemoteAuxiliary(
    state,
    ownProps.remoteId
  ),
}))(VideoCallRoom)
