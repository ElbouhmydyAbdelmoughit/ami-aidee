import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Headline, Button } from 'react-native-paper'
import { Actions } from 'react-native-router-flux'
import Br from 'src/ui/components/br'
import GradientBackground from '../GradientBackground'

const CallErrorPage = ({ errorAcknowledged }) => {
  const [countdown, setCountdown] = useState(3)
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
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          L'aidant a raccroché ou une erreur s'est reproduite. Veuillez
          ré-essayer plus tard.
        </Headline>
        <Br />
        <Button
          onPress={() => {
            Actions.pop()
            errorAcknowledged()
          }}
          color="white"
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
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
