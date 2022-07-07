import React from 'react'
import { View } from 'react-native'
import { Subheading } from 'react-native-paper'
import { Actions } from 'react-native-router-flux'
import { Button, Text } from 'native-base'
import CenterCardLayout from '../../components/layout/CenterCardLayout'
import { useTranslation } from 'react-i18next'
import { Translations } from 'core/i18n'

const PasswordResetConfirmedScreen = () => {
  const { t } = useTranslation()
  return (
    <CenterCardLayout>
      <Subheading>
        {t(
          'screen.password_reset_confirmed',
          'Votre demande de mot de passe a été bien prise en compte. Si votre compte existe, un email de ré-initialisation vous sera bientôt envoyé.'
        )}
      </Subheading>
      <View style={{ marginTop: 20 }}>
        <Button block onPress={() => Actions.login()}>
          {Translations.common.go_back}
        </Button>
      </View>
    </CenterCardLayout>
  )
}

export default PasswordResetConfirmedScreen
