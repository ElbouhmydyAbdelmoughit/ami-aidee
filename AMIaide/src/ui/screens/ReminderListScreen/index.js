import { connect } from 'react-redux';

import { MessageActions } from 'src/redux/message';

import ReminderListScreen from './ReminderListScreen';

const mapStateToProps = ({message}) => ({
  list: message.list,
  loading: message.loading
 });
 
 const mapDispatchToProps = dispatch => ({
  messagesRequest: (filters) => dispatch(MessageActions.messagesRequest(filters))
 });
 
export default connect(mapStateToProps, mapDispatchToProps)(ReminderListScreen);