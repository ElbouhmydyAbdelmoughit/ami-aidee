import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import SleepScreen from './SleepScreen';


const mapStateToProps = ({ auth }) => ({ 
  auth: auth
});
 
 const mapDispatchToProps = dispatch => ({
 });
 
export default connect(mapStateToProps, mapDispatchToProps)(SleepScreen);