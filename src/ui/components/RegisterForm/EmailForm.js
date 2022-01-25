import React, { useState } from 'react'
import { Form, Input, View, H3, Item, Button, Text, Icon } from 'native-base'
import { Actions } from '@ami-app/react-native-router-flux'
import useActivityLog from '../../hooks/use-activity-log'
import { useTranslation } from 'react-i18next'
import { Translations } from 'core/i18n'

const EmailForm = ({ setRegisterUser }) => {
  const [email, setEmail] = useState('')
  const [errorText, setErrorText] = useState(undefined)
  const logActivity = useActivityLog()
  const { t } = useTranslation()
  return (
    <View style={{ width: '100%' }}>
      <H3 style={{ marginBottom: 32, color: '#848484' }}>
        {errorText
          ? errorText
          : t('screen.register.email_title', 'Renseigner votre email')}
      </H3>
      <Form>
        <Item
          regular
          style={{
            borderRadius: 10,
            backgroundColor: '#EBEBEB',
            marginBottom: 16,
          }}
          error={!!errorText}
        >
          <Input
            autoCapitalize="none"
            placeholder={'Email'}
            autoFocus
            onChangeText={setEmail}
            value={email}
          />
          {errorText && <Icon name="close-circle" />}
        </Item>
        <Button
          full
          block
          onPress={() => {
            logActivity('press_register_email_step')
            let hasError = false
            if (!email) {
              setErrorText(
                t(
                  'screen.register.missing_email_error',
                  'Veuillez renseigner un adresse mail'
                )
              )
              hasError = true
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
            ) {
              hasError = true
              setErrorText(
                t(
                  'screen.register.invalid_email_error',
                  'Veuillez renseigner un adresse mail valide'
                )
              )
            }
            if (hasError) {
              return
            }
            setErrorText(undefined)
            setRegisterUser({
              email,
            })
            Actions.register({
              step: 'phone',
            })
          }}
          style={{ borderRadius: 10 }}
        >
          <Text>{Translations.common.to_continue}</Text>
        </Button>
      </Form>
    </View>
  )
}

export default EmailForm
