import { Actions } from 'react-native-router-flux'
import logger from 'core/logger'
import React, {
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
} from 'react'
import { TouchableHighlight } from 'react-native'
import { withNavigationFocus } from 'react-navigation'
import { RETURN_TO_HOME_DURATION } from 'utils/constant'

const BacktoRootTimer = withNavigationFocus(
  ({
    isFocused,
    children,
    duration = RETURN_TO_HOME_DURATION,
    timerRef,
  }: {
    duration: number
    children: any
    isFocused: boolean
  }) => {
    const timeoutRef = useRef<NodeJS.Timeout>()

    const cancelTimer = useCallback(() => {
      if (timeoutRef.current) {
        logger.debug('ui.BacktoRootTimer', 'cancel timer')
        clearTimeout(timeoutRef.current)
        timeoutRef.current = undefined
      }
    }, [])
    const launchTimer = useCallback(() => {
      cancelTimer()
      logger.debug('ui.BacktoRootTimer', 'launch timer')

      timeoutRef.current = setTimeout(() => {
        Actions.accueil()
      }, duration)
    }, [duration])

    useImperativeHandle(
      timerRef,
      () => ({
        reset: launchTimer,
        pause: cancelTimer,
        resume: launchTimer,
      }),
      []
    )

    useEffect(() => {
      if (isFocused) {
        launchTimer()
      } else {
        cancelTimer()
      }
      return () => {
        cancelTimer()
      }
    }, [isFocused])
    return (
      <TouchableHighlight style={{ flex: 1 }} onPress={launchTimer}>
        <>{children}</>
      </TouchableHighlight>
    )
  }
)

export const withBackToRootTimer = (Component: any) => {
  return (props: any) => {
    return (
      <BacktoRootTimer>
        <Component {...props} />
      </BacktoRootTimer>
    )
  }
}
export default BacktoRootTimer
