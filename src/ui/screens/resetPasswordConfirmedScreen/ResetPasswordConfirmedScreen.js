import { Translations } from 'core/i18n'
import { Button, Text } from 'native-base'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Subheading } from 'react-native-paper'
import { Actions } from 'react-native-router-flux'

import CenterCardLayout from '../../components/layout/CenterCardLayout'

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
