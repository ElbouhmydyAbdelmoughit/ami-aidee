import { connect } from 'react-redux'
import VideoReceivingPage from './VideoReceivingPage'
import { VideoCallActions, VideoCallSelectors } from '../../../redux/videoCall'

export default connect(
  state => ({
    errored: state.videoCall.errored,
    myUid: VideoCallSelectors.getMyUid(state),
    remoteInvitationProps: state.videoCall.remoteInvitationProps,
    callingRemoteAuxiliary: VideoCallSelectors.getRemoteAuxiliary(
      state,
      state.videoCall.remoteInvitationProps &&
        state.videoCall.remoteInvitationProps.callerId
    ),
  }),
  dispatch => ({
    refuseCallInvitation: () =>
      dispatch(VideoCallActions.invitationRefuseRequest()),
    acceptCallInvitation: () =>
      dispatch(VideoCallActions.invitationAcceptRequest()),
  })
)(VideoReceivingPage)
