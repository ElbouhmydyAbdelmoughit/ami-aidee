import { connect } from 'react-redux'
import MessagingScreen from './MessagingScreen'
import { InstantMessagesActions } from '../../../store/instantMessages'

export default connect(null, (dispatch, { auxiliary }) => ({
  updateLastReadRequest: (...args) =>
    dispatch(InstantMessagesActions.updateLastReadRequest(...args)),
  messagesRequest: () =>
    dispatch(InstantMessagesActions.messagesRequest(auxiliary)),
}))(MessagingScreen)
