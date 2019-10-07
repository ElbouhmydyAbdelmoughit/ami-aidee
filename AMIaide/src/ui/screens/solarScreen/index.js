import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import SolarScreen from './SolarScreen';

import { MessageActions } from 'src/redux/message';

const mapStateToProps = ({auth}) => ({
  me: auth.user || {}
 });
 
 const mapDispatchToProps = dispatch => ({
  messagesRequest: (filters) => dispatch(MessageActions.messagesRequest(filters))
 });
 
export default connect(mapStateToProps, mapDispatchToProps)(SolarScreen);