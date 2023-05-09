import { createReducer } from 'reduxsauce'

import { types } from './actions'

const initialState = {
  uid: undefined,
  localInvitationProps: undefined,
  remoteInvitationProps: undefined,
  incomingCall: false,
  errored: false,
}

const videoCallInitSuccess = (state = initialState, action) => {
  return { ...state, uid: action.uid }
}

const getMode = data => {
  try {
    return JSON.parse(data.content).mode
  } catch (e) {
    return 'video'
  }
}

const videoCallInvitationReceived = (state = initialState, action) => {
  return {
    ...state,
    incomingCall: true,
    remoteInvitationProps: {
      ...action.data,
      status: 'INVITATION_RECEIVED',
      mode: getMode(action.data),
    },
    errored: false,
  }
}

const videoCallInvitationRefuseRequestSuccess = (state = initialState) => {
  return {
    ...state,
    incomingCall: false,
    remoteInvitationProps: undefined,
  }
}

const videoCallInvitationRefuseRequestError = (state = initialState) => {
  return {
    ...state,
    incomingCall: false,
    remoteInvitationProps: undefined,
  }
}

const remoteInvitationAccepted = (state = initialState) => {
  return {
    ...state,
    incomingCall: false,
    remoteInvitationProps: {
      ...state.remoteInvitationProps,
      status: 'ACCEPTED',
    },
  }
}
const remoteInvitationCanceled = (state = initialState) => {
  return {
    ...state,
    incomingCall: false,
    remoteInvitationProps: {
      ...state.remoteInvitationProps,
      status: 'CANCELED_BY_CALLER',
    },
  }
}

const videoCallInvitationAcceptRequestError = (state = initialState) => {
  return {
    ...state,
    incomingCall: false,
    remoteInvitationProps: undefined,
    errored: true,
  }
}

const errorAcknowkledged = (state = initialState) => {
  return {
    ...state,
    errored: false,
  }
}

const localInvitationInit = (state = initialState) => {
  return {
    ...state,
    localInvitationProps: {
      status: 'INIT',
    },
  }
}

const videoCallLocalInvitationRequestSuccess = (
  state = initialState,
  action
) => {
  const newStatus =
    state.localInvitationProps &&
    state.localInvitationProps.status === 'RECEIVED'
      ? 'RECEIVED'
      : 'INVITATION_SENT'

  return {
    ...state,
    localInvitationProps: {
      ...action.data,
      status: newStatus,
    },
  }
}

const videoCallLocalInvitationReceived = (state = initialState) => {
  return {
    ...state,
    localInvitationProps: {
      ...state.localInvitationProps,
      status: 'RECEIVED',
    },
  }
}

const videoCallLocalInvitationRefused = (state = initialState) => {
  return {
    ...state,
    localInvitationProps: {
      status: 'REFUSED_BY_CALLEE',
    },
  }
}

const videoCallLocalInvitationFailure = (state = initialState) => {
  return {
    ...state,
    localInvitationProps: {
      status: 'FAILURE',
    },
  }
}

const videoCallLocalInvitationAccepted = (state = initialState, action) => {
  return {
    ...state,
    localInvitationProps: {
      ...state.localInvitationProps,
      ...action.data,
      status: 'ACCEPTED',
    },
  }
}

export default createReducer(initialState, {
  [types.INIT_SUCCESS]: videoCallInitSuccess,

  // remote invitation
  [types.INVITATION_RECEIVED]: videoCallInvitationReceived,
  [types.INVITATION_REFUSE_REQUEST_SUCCESS]: videoCallInvitationRefuseRequestSuccess,
  [types.INVITATION_REFUSE_REQUEST_ERROR]: videoCallInvitationRefuseRequestError,
  [types.INVITATION_ACCEPT_REQUEST_ERROR]: videoCallInvitationAcceptRequestError,
  [types.REMOTE_INVITATION_ACCEPTED]: remoteInvitationAccepted,
  [types.REMOTE_INVITATION_CANCELED]: remoteInvitationCanceled,

  // local invitation
  [types.LOCAL_INVITATION_INIT]: localInvitationInit,
  [types.LOCAL_INVITATION_REQUEST_SUCCESS]: videoCallLocalInvitationRequestSuccess,
  [types.LOCAL_INVITATION_REFUSED]: videoCallLocalInvitationRefused,
  [types.LOCAL_INVITATION_FAILURE]: videoCallLocalInvitationFailure,
  [types.LOCAL_INVITATION_ACCEPTED]: videoCallLocalInvitationAccepted,
  [types.LOCAL_INVITATION_RECEIVED]: videoCallLocalInvitationReceived,
  [types.ERROR_ACKED]: errorAcknowkledged,
})
