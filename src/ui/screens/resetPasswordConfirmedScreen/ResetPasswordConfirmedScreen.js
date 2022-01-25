import React from 'react'
import { Subheading } from 'react-native-paper'
import { Button, Text } from 'native-base'
import { Actions } from '@ami-app/react-native-router-flux'
import CenterCardLayout from '../../components/layout/CenterCardLayout'
import { Translations } from 'core/i18n'
import { useTranslation } from 'react-i18next'

const ResetPasswordConfirmedScreen = () => {
  const { t } = useTranslation()
  return (
    <CenterCardLayout>
      <Subheading style={{ marginBottom: 64 }}>
        {t(
          'screen.reset_password_confirmed',
          'Votre demande de réinitialisation de mot de passe a été prise en compte.'
        )}
      </Subheading>
      <Button block onPress={() => Actions.login()}>
        <Text>{Translations.common.back_to_home}</Text>
      </Button>
    </CenterCardLayout>
  )
}

export default ResetPasswordConfirmedScreen
