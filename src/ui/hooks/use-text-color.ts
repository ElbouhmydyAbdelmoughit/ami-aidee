import moment from 'moment'
import { useSelector } from 'react-redux'
import { AuthSelectors } from 'store/auth'
import { times } from 'utils'
import colorUtils from 'utils/colors'

const useTextColor = () => {
  const currentHelpedUser = useSelector(AuthSelectors.getCurrentHelpedUser)
  const time = times(moment(), currentHelpedUser)
  const textColor = colorUtils.getTextColor(time)
  return textColor
}

export default useTextColor
