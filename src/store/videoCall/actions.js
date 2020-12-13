import { createAction } from '../../utils'

// Types
export const types = {
  INIT: 'VC_INIT',
  INIT_SUCCESS: 'VC_INIT_SUCCESS',
  CALLBACK_EVENT: 'VC_CALLBACK_EVENT',
  INVITATION_RECEIVED: 'VC_INVITATION_RECEIVED',
  INVITATION_REFUSE_REQUEST: 'VC_INVITATION_REFUSE_REQUEST',
  INVITATION_REFUSE_REQUEST_SUCCESS: 'VC_INVITATION_REFUSE_REQUEST_SUCCESS',
  INVITATION_REFUSE_REQUEST_ERROR: 'VC_INVITATION_REFUSE_REQUEST_ERROR',
  INVITATION_ACCEPT_REQUEST: 'VC_INVITATION_ACCEPT_REQUEST',
  INVITATION_ACCEPT_REQUEST_SUCCESS: 'VC_INVITATION_ACCEPT_REQUEST_SUCCESS',
  INVITATION_ACCEPT_REQUEST_ERROR: 'VC_INVITATION_ACCEPT_REQUEST_ERROR',

  LOCAL_INVITATION_INIT: 'VC_LOCAL_INVITATION_INIT',
  INVITATION_REQUEST: 'VC_INVITATION_REQUEST',
  LOCAL_INVITATION_REQUEST_SUCCESS: 'VC_LOCAL_INVITATION_REQUEST_SUCCESS',
  LOCAL_INVITATION_REFUSED: 'VC_LOCAL_INVITATION_REFUSED',
  LOCAL_INVITATION_FAILURE: 'VC_LOCAL_INVITATION_FAILURE',
  LOCAL_INVITATION_ACCEPTED: 'VC_LOCAL_INVITATION_ACCEPTED',
  LOCAL_INVITATION_RECEIVED: 'VC_LOCAL_INVITATION_RECEIVED',
  LOCAL_INVITATION_CANCEL_REQUEST: 'VC_LOCAL_INVITATION_CANCEL_REQUEST',

  REMOTE_INVITATION_ACCEPTED: 'VC_REMOTE_INVITATION_ACCEPTED',
  REMOTE_INVITATION_CANCELED: 'VC_REMOTE_INVITATION_CANCELED',

  ERROR_ACKED: 'VC_ERROR_ACKNOWLEDGED',
}

// Actions
export default {
  init: ({ dispatch }) => createAction(types.INIT, { dispatch }),
  initSuccess: ({ uid }) => createAction(types.INIT_SUCCESS, { uid }),
  event: (event, args) =>
    createAction(types.CALLBACK_EVENT, { ...args, event }),

  invitationRequest: ({ calleeId, mode = 'video' }) =>
    createAction(types.INVITATION_REQUEST, { calleeId, mode }),
  invitationReceived: args =>
    createAction(types.INVITATION_RECEIVED, { data: args }),
  invitationRefuseRequest: () => createAction(types.INVITATION_REFUSE_REQUEST),
  invitationRefuseSuccess: () =>
    createAction(types.INVITATION_REFUSE_REQUEST_SUCCESS),
  invitationRefuseError: ({ error }) =>
    createAction(types.INVITATION_REFUSE_REQUEST_ERROR, { error }),
  invitationAcceptRequest: () => createAction(types.INVITATION_ACCEPT_REQUEST),
  invitationAcceptSuccess: () =>
    createAction(types.INVITATION_ACCEPT_REQUEST_SUCCESS),
  invitationAcceptError: ({ error }) =>
    createAction(types.INVITATION_ACCEPT_REQUEST_ERROR, { error }),

  localInvitationInit: () => createAction(types.LOCAL_INVITATION_INIT),
  localInvitationRequestSuccess: args =>
    createAction(types.LOCAL_INVITATION_REQUEST_SUCCESS, { data: args }),
  localInvitationRefused: () => createAction(types.LOCAL_INVITATION_REFUSED),
  localInvitationFailure: () => createAction(types.LOCAL_INVITATION_FAILURE),
  localInvitationAccepted: args =>
    createAction(types.LOCAL_INVITATION_ACCEPTED, { data: args }),
  localInvitationReceived: args =>
    createAction(types.LOCAL_INVITATION_RECEIVED, { data: args }),
  localInvitationCancelRequest: () =>
    createAction(types.LOCAL_INVITATION_CANCEL_REQUEST),

  remoteInvitationAccepted: () =>
    createAction(types.REMOTE_INVITATION_ACCEPTED),
  remoteInvitationCanceled: () =>
    createAction(types.REMOTE_INVITATION_CANCELED),
  errorAcknowledged: () => createAction(types.ERROR_ACKED),
}
