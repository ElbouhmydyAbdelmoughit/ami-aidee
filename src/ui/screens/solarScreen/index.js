import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import RedirectToAction from './RedirectToAction';

import { MessageActions } from 'src/redux/message';
import { messageToNotify } from 'src/utils';

const mapStateToProps = ({ auth, message }) => ({
  me: auth.user || {},
  messageToNotify: messageToNotify(Object.values(message.list))
 });
 
 const mapDispatchToProps = dispatch => ({
  messagesRequest: (filters) => dispatch(MessageActions.messagesRequest(filters))
 });
 
export default connect(mapStateToProps, mapDispatchToProps)(RedirectToAction);