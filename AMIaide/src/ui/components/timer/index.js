import { connect } from 'react-redux';
import Timer from './Timer';

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);