import React, { useEffect,useState } from 'react'
import { Text,View } from 'react-native'
import { Button,Headline } from 'react-native-paper'
import { Actions } from 'react-native-router-flux'
import Br from 'src/ui/components/br'
import useTextColor from 'ui/hooks/use-text-color'

import useActivityLog from '../../hooks/use-activity-log'
import GradientBackground from '../GradientBackground'

const CallErrorPage = ({ errorAcknowledged }) => {
  const [countdown, setCountdown] = useState(3)
  const logActivity = useActivityLog()
  const textColor = useTextColor()
  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(cd => cd - 1)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])
  useEffect(() => {
    if (countdown === 0) {
      Actions.pop()
      errorAcknowledged()
    }
  }, [countdown])
  return (
    <GradientBackground>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Br />
        <Headline
          style={{
            textAlign: 'center',
            fontSize: 24,
            color: textColor,
            fontWeight: 'bold',
          }}
        >
          L'aidant a raccroché ou une erreur s'est reproduite. Veuillez
          ré-essayer plus tard.
        </Headline>
        <Br />
        <Button
          onPress={() => {
            logActivity('press_end_video_call_btn')
            Actions.pop()
            errorAcknowledged()
          }}
          color={textColor}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: textColor,
            }}
          >
            Revenir dans {countdown} secondes
          </Text>
        </Button>
      </View>
    </GradientBackground>
  )
}

export default CallErrorPage
