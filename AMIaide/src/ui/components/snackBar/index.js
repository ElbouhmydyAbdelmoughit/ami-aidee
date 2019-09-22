import { getTranslate } from 'react-localize-redux';
import { connect } from 'react-redux';
import { SnackActions } from '../../../redux/snackBar';
import { SnackBar } from './SnackBar';

const mapStateToProps = state => ({
  message: getTranslate(state.locale)(state.snackBar.message),
  level: state.snackBar.level,
  isShown: state.snackBar.displayed,
});

const mapDispatchToProps = dispatch => ({
  forceHide: () => dispatch(SnackActions.hideSnackBar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SnackBar);
