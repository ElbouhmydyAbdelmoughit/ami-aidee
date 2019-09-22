import { connect } from 'react-redux';
import PreviewScreen from './PreviewScreen';
import { MessageActions } from 'src/redux/message';
const mapStateToProps = ({locale}) => ({
 });
 
 const mapDispatchToProps = dispatch => ({
  messageCreateRequest: (data) => dispatch(MessageActions.messageCreateRequest(data))

 });
 
export default connect(mapStateToProps, mapDispatchToProps)(PreviewScreen);