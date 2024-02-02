import { authenticatedService } from './middleware'

const SEND_INCOMING_CALL_CF =
  'https://us-central1-ami-aidant.cloudfunctions.net/sendIncomingCallNotification_v2'

const CANCEL_INCOMING_CALL_CF =
  'https://us-central1-ami-aidant.cloudfunctions.net/cancelIncomingCallNotification_v2'

const sendIncomingCallNotification = ({ caller, calleeId }) => {
  return authenticatedService('post', SEND_INCOMING_CALL_CF, {
    caller,
    callee_id: calleeId,
  })
}

const cancelIncomingCallNotification = ({ caller, calleeId }) => {
  return authenticatedService('post', CANCEL_INCOMING_CALL_CF, {
    caller,
    callee_id: calleeId,
  })
}

const PushNotificationService = {
  sendIncomingCallNotification,
  cancelIncomingCallNotification,
}

export default PushNotificationService
