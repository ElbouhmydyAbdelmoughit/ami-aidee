import { connect } from 'react-redux'

import { AuthSelectors } from '../../../store/auth'
import {
  InstantMessagesActions,
  InstantMessagesSelectors,
} from '../../../store/instantMessages'
import ChatRoom from './ChatRoom'

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
