import { connect } from 'react-redux'

import { VideoCallActions, VideoCallSelectors } from '../../../store/videoCall'
import VideoCallPage from './VideoCallPage'

export default connect(
  state => ({
    myUid: VideoCallSelectors.getMyUid(state),
    errored: state.videoCall.errored,
    localInvitation: state.videoCall.localInvitationProps,
  }),
  dispatch => ({
    videoCallInvitationRequest: (...args) =>
      dispatch(VideoCallActions.invitationRequest(...args)),
    videoCallInvitationCancelRequest: (...args) =>
      dispatch(VideoCallActions.localInvitationCancelRequest(...args)),
    videoCallInvitationInit: () =>
      dispatch(VideoCallActions.localInvitationInit()),
  })
)(VideoCallPage)
