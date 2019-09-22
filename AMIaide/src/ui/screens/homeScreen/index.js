import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import HomeScreen from './HomeScreen';

import { MessageActions } from 'src/redux/message';

const mapStateToProps = ({auth, message}) => ({
  list: message.list,
  me: auth.user,
  loading: message.loading
 });
 
 const mapDispatchToProps = dispatch => ({
  messagesRequest: (filters) => dispatch(MessageActions.messagesRequest(filters))
 });
 
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);