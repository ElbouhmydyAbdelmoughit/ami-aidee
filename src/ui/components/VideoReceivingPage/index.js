import { connect } from 'react-redux'

import { AuthSelectors } from '../../../store/auth'
import { VideoCallActions, VideoCallSelectors } from '../../../store/videoCall'
import VideoReceivingPage from './VideoReceivingPage'

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
    currentHelpedUser: AuthSelectors.getCurrentHelpedUser(state),
  }),
  dispatch => ({
    refuseCallInvitation: () =>
      dispatch(VideoCallActions.invitationRefuseRequest()),
    acceptCallInvitation: () =>
      dispatch(VideoCallActions.invitationAcceptRequest()),
  })
)(VideoReceivingPage)
