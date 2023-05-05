import logger from 'core/logger'
import React, { useCallback, useEffect, useRef } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { withNavigationFocus } from 'react-navigation'
import { SCREENSAVING_DURATION } from 'utils/constant'

const SleepTimer = withNavigationFocus(({ isFocused, children }: any) => {
  const timeoutRef = useRef<NodeJS.Timeout>()

  const cancelTimer = useCallback(() => {
    if (timeoutRef.current) {
      logger.debug('ui.SleepTimer', 'cancel timer')
      clearTimeout(timeoutRef.current)
      timeoutRef.current = undefined
    }
  }, [])
  const launchTimer = useCallback(() => {
    cancelTimer()
    logger.debug('ui.SleepTimer', 'launch timer')
    timeoutRef.current = setTimeout(() => {
      Actions.sleep()
    }, SCREENSAVING_DURATION)
  }, [])

  useEffect(() => {
    if (isFocused) {
      launchTimer()
    } else {
      cancelTimer()
    }
  }, [isFocused])
  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={launchTimer}>
      {children}
    </TouchableWithoutFeedback>
  )
})

export default SleepTimer
