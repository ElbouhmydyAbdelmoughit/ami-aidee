import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import SleepScreen from './SleepScreen';

import { TimerActions } from 'src/redux/timer';

const mapStateToProps = ({ auth }) => ({ 
  auth: auth
});
 
const mapDispatchToProps = dispatch => ({
  awake: () => dispatch(TimerActions.awake())
 });
 
export default connect(mapStateToProps, mapDispatchToProps)(SleepScreen);