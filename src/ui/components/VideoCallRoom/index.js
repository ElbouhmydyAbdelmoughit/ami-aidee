import { connect } from 'react-redux'
import VideoCallRoom from './VideoCallRoom'
import { VideoCallSelectors } from '../../../redux/videoCall'

export default connect((state, ownProps) => ({
  remoteAuxiliary: VideoCallSelectors.getRemoteAuxiliary(
    state,
    ownProps.remoteId
  ),
}))(VideoCallRoom)
