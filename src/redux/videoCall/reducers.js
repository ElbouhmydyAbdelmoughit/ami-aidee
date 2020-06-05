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

const videoCallInvitationReceived = (state = initialState, action) => {
  return {
    ...state,
    incomingCall: true,
    remoteInvitationProps: {
      ...action.data,
      status: 'INVITATION_RECEIVED',
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
  if (
    state.localInvitationProps &&
    state.localInvitationProps.status === 'INVITATION_RECEIVED'
  ) {
    return state
  }
  return {
    ...state,
    localInvitationProps: {
      ...action.data,
      status: 'INVITATION_SENT',
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

  // local invitation
  [types.LOCAL_INVITATION_INIT]: localInvitationInit,
  [types.LOCAL_INVITATION_REQUEST_SUCCESS]: videoCallLocalInvitationRequestSuccess,
  [types.LOCAL_INVITATION_REFUSED]: videoCallLocalInvitationRefused,
  [types.LOCAL_INVITATION_FAILURE]: videoCallLocalInvitationFailure,
  [types.LOCAL_INVITATION_ACCEPTED]: videoCallLocalInvitationAccepted,
  [types.LOCAL_INVITATION_RECEIVED]: videoCallLocalInvitationReceived,
  [types.ERROR_ACKED]: errorAcknowkledged,
})
