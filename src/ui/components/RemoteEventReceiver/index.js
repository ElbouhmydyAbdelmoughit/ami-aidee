import { connect } from 'react-redux'

import { InstantMessagesActions } from '../../../store/instantMessages'
import { VideoCallActions, VideoCallSelectors } from '../../../store/videoCall'
import RemoteEventReceiver from './RemoteEventReceiver'

export default connect(
  state => ({
    myUid: VideoCallSelectors.getMyUidStr(state),
    incomingCall: state.videoCall.incomingCall,
    callerId: state.videoCall.callerId,
  }),
  dispatch => ({
    videoCallInit: (...args) => dispatch(VideoCallActions.init(...args)),
    dispatch,
    onNewInstantMessage: (...args) =>
      dispatch(InstantMessagesActions.messageReceived(...args)),
  })
)(RemoteEventReceiver)
