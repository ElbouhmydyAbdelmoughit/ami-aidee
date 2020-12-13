import { connect } from 'react-redux'
import ChatRoom from './ChatRoom'
import {
  InstantMessagesActions,
  InstantMessagesSelectors,
} from '../../../store/instantMessages'
import { AuthSelectors } from '../../../store/auth'

export default connect(
  (state, { auxiliary }) => ({
    messages: InstantMessagesSelectors.getMessages(auxiliary)(state),
    currentUserId: AuthSelectors.getUserId(state),
  }),
  (dispatch, { auxiliary }) => ({
    sendMessage: content =>
      dispatch(InstantMessagesActions.sendMessage(auxiliary, content)),
    messagesRequest: () =>
      dispatch(InstantMessagesActions.messagesRequest(auxiliary)),
  })
)(ChatRoom)
