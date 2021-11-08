import React from 'react'
import { Subheading } from 'react-native-paper'
import { Button, Text } from 'native-base'
import { Actions } from '@ami-app/react-native-router-flux'
import CenterCardLayout from '../../components/layout/CenterCardLayout'

const ResetPasswordConfirmedScreen = () => {
  return (
    <CenterCardLayout>
      <Subheading style={{ marginBottom: 64 }}>
        Votre demande de réinitialisation de mot de passe a été prise en compte.
      </Subheading>
      <Button block onPress={() => Actions.login()}>
        <Text>Retourner à l'accueil</Text>
      </Button>
    </CenterCardLayout>
  )
}

export default ResetPasswordConfirmedScreen
