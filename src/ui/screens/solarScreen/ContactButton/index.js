import { connect } from 'react-redux'
import ContactButton from './ContactButton'
import { InstantMessagesSelectors } from '../../../../store/instantMessages'

export default connect((state, { auxiliary }) => ({}))(ContactButton)
