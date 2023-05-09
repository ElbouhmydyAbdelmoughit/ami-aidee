import RtmEngine from 'agora-react-native-rtm'
import errorReporter from 'core/error-reporter'
import { Actions } from 'react-native-router-flux'
import { call,put, select, takeLatest } from 'redux-saga/effects'

import { PushNotificationService } from '../../services'
import { AGORA_APP_ID } from '../../utils/constant'
import { AuthSelectors } from '../auth'
import VideoCallActions, { types } from './actions'
import VideoCallSelectors from './selectors'

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
  REMOTE_INVITATION_CANCELED: 'remoteInvitationCanceled',

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

function* videoCallInvitationRequest({ calleeId, mode }) {
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
    content: JSON.stringify({ mode }),
  }
  try {
    yield call(rtmEngine.sendLocalInvitation, localInvitation)
    const me = yield select(AuthSelectors.getCurrentHelpedUser)
    yield put(VideoCallActions.localInvitationRequestSuccess(localInvitation))

    yield call(PushNotificationService.sendIncomingCallNotification, {
      calleeId,
      caller: me,
    })
  } catch (e) {
    errorReporter.report(e)
  }
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
  [CALLBACK_EVENTS.REMOTE_INVITATION_CANCELED]:
    VideoCallActions.remoteInvitationCanceled,
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
      uid: videoCallState.remoteInvitationProps.callerId,
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
      uid: videoCallState.remoteInvitationProps.callerId,
    })
    console.log('accept success')
    yield put(VideoCallActions.invitationAcceptSuccess())
  } catch (e) {
    console.log('accept error', e)
    yield put(VideoCallActions.invitationAcceptError({ error: e }))
  }
}

function* localInvitationCancelRequest() {
  const videoCallState = yield select(state => state.videoCall)
  try {
    yield call(
      rtmEngine.cancelLocalInvitation,
      videoCallState.localInvitationProps
    )

    const me = yield select(AuthSelectors.getCurrentHelpedUser)
    yield call(PushNotificationService.cancelIncomingCallNotification, {
      calleeId: videoCallState.localInvitationProps.calleeId,
      caller: me,
    })
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
