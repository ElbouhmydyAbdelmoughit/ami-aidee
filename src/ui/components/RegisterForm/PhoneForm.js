import React, { useState } from 'react'
import { Form, Input, View, H3, Item, Button, Text, Icon } from 'native-base'
import { Actions } from '@ami-app/react-native-router-flux'
import useActivityLog from '../../hooks/use-activity-log'
import { useTranslation } from 'react-i18next'
import { Translations } from 'core/i18n'

const PhoneForm = ({ setRegisterUser }) => {
  const [phone, setPhone] = useState('')

  const [invitationCode, setInvitationCode] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [errorText, setErrorText] = useState(undefined)
  const [errorField, setErrorField] = useState(undefined)
  const logActivity = useActivityLog()
  const { t } = useTranslation()
  return (
    <View style={{ width: '100%' }}>
      <H3 style={{ marginBottom: 32, color: '#848484' }}>
        {errorText
          ? errorText
          : t(
              'screen.register.phone_title',
              'Renseigner votre numéro de téléphone, votre code départemental et le code de parrainage (optionnel)'
            )}
      </H3>
      <Form>
        <Item
          regular
          style={{
            borderRadius: 10,
            backgroundColor: '#EBEBEB',
            marginBottom: 16,
          }}
          error={errorField === 'phone'}
        >
          <Input
            autoCapitalize="none"
            placeholder={Translations.common.phone_number}
            onChangeText={setPhone}
            value={phone}
            autoFocus
          />
          {errorField === 'phone' && <Icon name="close-circle" />}
        </Item>
        <View
          style={{
            borderRadius: 10,
            flexDirection: 'row',
            width: '100%',
            marginBottom: 16,
          }}
        >
          <Item
            regular
            style={{
              borderRadius: 10,
              backgroundColor: '#EBEBEB',
              marginBottom: 16,
              flex: 1,
            }}
            error={errorField === 'postalCode'}
          >
            <Input
              autoCapitalize="none"
              placeholder={t(
                'screen.register.postal_code_placeholder',
                'Code départemental (ex. : 75)'
              )}
              onChangeText={setPostalCode}
              value={postalCode}
            />
            {errorField === 'postalCode' && <Icon name="close-circle" />}
          </Item>
          <Item
            regular
            style={{
              borderRadius: 10,
              backgroundColor: '#EBEBEB',
              marginBottom: 16,
              flex: 1,
            }}
          >
            <Input
              autoCapitalize="none"
              placeholder={t(
                'screen.register.referral_code_placeholder',
                'Code de parrainage (optionnel)'
              )}
              onChangeText={setInvitationCode}
              value={invitationCode}
            />
          </Item>
        </View>
        <Button
          full
          block
          onPress={() => {
            logActivity('press_register_phone_step')
            let hasError = false
            if (!phone) {
              setErrorText(
                t(
                  'screen.register.missing_phone_number_error',
                  'Veuillez renseigner un numéro de téléphone'
                )
              )

              setErrorField('phone')
              hasError = true
            } else if (!/\+?[0-9]+/.test(phone)) {
              hasError = true
              setErrorText(
                t(
                  'screen.register.invalid_phone_number_error',
                  'Veuillez renseigner un numéro de téléphone valide'
                )
              )

              setErrorField('phone')
            }
            if (!postalCode) {
              setErrorText(
                t(
                  'screen.register.missing_postal_code_error',
                  'Veuillez renseigner un code départemental'
                )
              )
              setErrorField('postalCode')
            }
            if (hasError) {
              return
            }
            setErrorText(undefined)
            setRegisterUser({
              phone,
              postalCode,
              invitationCode,
            })
            Actions.register({
              step: 'password',
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

export default PhoneForm
