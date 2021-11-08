import React from 'react'
import { View } from 'react-native'
import { Subheading } from 'react-native-paper'
import { Actions } from '@ami-app/react-native-router-flux'
import { Button, Text } from 'native-base'
import CenterCardLayout from '../../components/layout/CenterCardLayout'

const PasswordResetConfirmedScreen = () => {
  return (
    <CenterCardLayout>
      <Subheading>
        Votre demande de mot de passe a été bien prise en compte. Si votre
        compte existe, un email de ré-initialisation vous sera bientôt envoyé.
      </Subheading>
      <View style={{ marginTop: 20 }}>
        <Button block onPress={() => Actions.login()}>
          <Text>Revenir</Text>
        </Button>
      </View>
    </CenterCardLayout>
  )
}

export default PasswordResetConfirmedScreen
