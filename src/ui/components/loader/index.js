import { connect } from 'react-redux'

import Loader from './Loader'

const mapStateToProps = state => ({
  loading: state.loader.displayed,
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Loader)
