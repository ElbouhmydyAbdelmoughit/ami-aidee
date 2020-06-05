import React from 'react'
import { View } from 'react-native'
import { Headline, Button } from 'react-native-paper'
import { Actions } from 'react-native-router-flux'
import Br from 'src/ui/components/br'
import GradientBackground from '../GradientBackground'

const CallErrorPage = ({ errorAcknowledged }) => {
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
            fontSize: 15,
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
          Revenir
        </Button>
      </View>
    </GradientBackground>
  )
}

export default CallErrorPage
