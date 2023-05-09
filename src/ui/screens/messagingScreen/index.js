import { connect } from 'react-redux'

import { InstantMessagesActions } from '../../../store/instantMessages'
import MessagingScreen from './MessagingScreen'

export default connect(null, (dispatch, { auxiliary }) => ({
  updateLastReadRequest: (...args) =>
    dispatch(InstantMessagesActions.updateLastReadRequest(...args)),
  messagesRequest: () =>
    dispatch(InstantMessagesActions.messagesRequest(auxiliary)),
}))(MessagingScreen)
