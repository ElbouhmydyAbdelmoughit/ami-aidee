import { connect } from 'react-redux'
import ContactsList from './ContactsList'
import {
  AuxiliarySelectors,
  AuxiliaryActions,
} from '../../../redux/auxiliaries'

export default connect(
  state => ({
    auxiliaries: AuxiliarySelectors.getMyAuxiliaries(state),
    loading: state.auxiliary.loading,
  }),
  dispatch => ({
    myAuxiliariesRequest: () =>
      dispatch(AuxiliaryActions.myAuxiliariesRequest()),
  })
)(ContactsList)
