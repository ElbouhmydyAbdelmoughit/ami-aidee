import { connect } from 'react-redux'
import VideoCallWaiter from './VideoCallWaiter'
import { VideoCallActions, VideoCallSelectors } from '../../../redux/videoCall'

export default connect(
  state => ({
    myUid: VideoCallSelectors.getMyUidStr(state),
    incomingCall: state.videoCall.incomingCall,
    callerId: state.videoCall.callerId,
  }),
  dispatch => ({
    videoCallInit: (...args) => dispatch(VideoCallActions.init(...args)),
    dispatch,
  })
)(VideoCallWaiter)
