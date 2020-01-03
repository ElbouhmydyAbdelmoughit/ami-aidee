import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import SplashScreen from './SplashScreen';


const mapStateToProps = ({ auth }) => ({ 
  auth: auth
});
 
 const mapDispatchToProps = dispatch => ({
 });
 
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);