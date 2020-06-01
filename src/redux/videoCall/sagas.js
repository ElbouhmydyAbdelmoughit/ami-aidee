import { Actions } from 'react-native-router-flux'
import RtmEngine from 'agora-react-native-rtm'
import { takeLatest, put, select, call } from 'redux-saga/effects'
import VideoCallSelectors from './selectors'
import VideoCallActions, { types } from './actions'
import { AGORA_APP_ID } from '../../utils/constant'

let rtmEngine

const CALLBACK_EVENTS = {
  ERROR: 'error',
  CHANNEL_MESSAGE_RECEIVED: 'channelMessageReceived',
  MESSAGE_RECEIVED: 'messageReceived',
  CHANNEL_MEMBER_JOINED: 'channelMemberJoined',
  CHANNEL_MEMBER_LEFT: 'channelMemberLeft',
  TOKEN_EXPIRED: 'tokenExpired',
  CONNECTION_STATE_CHANGED: 'connectionStateChanged',
  REMOTE_INVITATION_ACCEPTED: 'remoteInvitationAccepted',
  REMOTE_INVITATION_RECEIVED: 'remoteInvitationReceived',
  REMOTE_INVITATION_FAILURE: 'remoteInvitationFailure',
  REMOTE_INVITATION_REFUSED: 'remoteInvitationRefused',
  LOCAL_INVITATION_ACCEPTED: 'localInvitationAccepted',
  LOCAL_INVITATION_CANCELED: 'localInvitationCanceled',
  LOCAL_INVITATION_FAILURE: 'localInvitationFailure',
  LOCAL_INVITATION_REFUSED: 'localInvitationRefused',
  LOCAL_INVITATION_RECEIVED_BY_PEER: 'localInvitationReceivedByPeer',
}

function* videoCallInit({ dispatch }) {
  if (rtmEngine) {
    console.warn('rtm engine already created. Skipping..')
    return
  }
  rtmEngine = new RtmEngine()
  const uid = yield select(VideoCallSelectors.getMyUidStr)

  Object.values(CALLBACK_EVENTS).forEach(event => {
    rtmEngine.on(event, args => {
      console.log(event, args)
      dispatch(VideoCallActions.event(event, args))
    })
  })

  rtmEngine.createClient(AGORA_APP_ID)
  rtmEngine.login({
    uid,
  })
  yield put(VideoCallActions.initSuccess({ uid }))
}

function* videoCallInvitationRequest({ calleeId }) {
  if (!rtmEngine) {
    console.error(
      'rtm engine not initialized. Please dispatch videoCallInit action first'
    )
    return
  }

  const uid = yield select(state => state.videoCall.uid)
  const localInvitation = {
    uid: calleeId.toString(),
    calleeId: calleeId.toString(),
    channelId: `${uid}-${calleeId}`,
  }
  try {
    yield call(rtmEngine.sendLocalInvitation, localInvitation)
  } catch (e) {
    console.log('invitation error', e)
    throw e
  }

  yield put(VideoCallActions.localInvitationRequestSuccess(localInvitation))
}

const EVENT_ACTIONS = {
  [CALLBACK_EVENTS.REMOTE_INVITATION_RECEIVED]:
    VideoCallActions.invitationReceived,
  [CALLBACK_EVENTS.LOCAL_INVITATION_REFUSED]:
    VideoCallActions.localInvitationRefused,
  [CALLBACK_EVENTS.LOCAL_INVITATION_FAILURE]:
    VideoCallActions.localInvitationFailure,
  [CALLBACK_EVENTS.LOCAL_INVITATION_ACCEPTED]:
    VideoCallActions.localInvitationAccepted,
  [CALLBACK_EVENTS.LOCAL_INVITATION_RECEIVED_BY_PEER]:
    VideoCallActions.localInvitationReceived,
  [CALLBACK_EVENTS.REMOTE_INVITATION_ACCEPTED]:
    VideoCallActions.remoteInvitationAccepted,
}
function* videoCallCallbackEvent({ event, type, ...args }) {
  if (EVENT_ACTIONS[event]) {
    yield put(EVENT_ACTIONS[event](args))
  }
}

function* videoCallInvitationRefuseRequest() {
  const videoCallState = yield select(state => state.videoCall)
  try {
    yield call(rtmEngine.refuseRemoteInvitation, {
      ...videoCallState.remoteInvitationProps,
      uid: videoCallState.uid,
    })
    console.log('refused success')
    yield put(VideoCallActions.invitationRefuseSuccess())
  } catch (e) {
    console.log('refused error')
    yield put(VideoCallActions.invitationRefuseError({ error: e }))
  } finally {
    Actions.pop()
  }
}

function* videoCallInvitationAcceptRequest() {
  const videoCallState = yield select(state => state.videoCall)
  try {
    yield call(rtmEngine.acceptRemoteInvitation, {
      ...videoCallState.remoteInvitationProps,
      uid: videoCallState.uid,
    })
    console.log('accept success')
    yield put(VideoCallActions.invitationAcceptSuccess())
  } catch (e) {
    console.log('accept error')
    yield put(VideoCallActions.invitationAcceptError({ error: e }))
    try {
      yield put(VideoCallActions.invitationRefuseRequest())
    } catch (e) {
      // what todo?
    }
  }
}

function* localInvitationCancelRequest() {
  const videoCallState = yield select(state => state.videoCall)
  try {
    yield call(
      rtmEngine.cancelLocalInvitation,
      videoCallState.localInvitationProps
    )
  } catch (e) {
    console.warn('cancel error', e)
  }
}

export default [
  takeLatest(types.INIT, videoCallInit),
  takeLatest(types.INVITATION_REQUEST, videoCallInvitationRequest),
  takeLatest(types.CALLBACK_EVENT, videoCallCallbackEvent),
  takeLatest(types.INVITATION_REFUSE_REQUEST, videoCallInvitationRefuseRequest),
  takeLatest(types.INVITATION_ACCEPT_REQUEST, videoCallInvitationAcceptRequest),
  takeLatest(
    types.LOCAL_INVITATION_CANCEL_REQUEST,
    localInvitationCancelRequest
  ),
]
