import React, { useState } from 'react'
import { Button, Text } from 'native-base'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { View } from 'react-native'
import { t, Translations } from 'core/i18n'
import { useTranslation } from 'react-i18next'
import TextInput from 'ui/components/common/TextInput'

const formSchema = Yup.object().shape({
  password: Yup.string()
    .required(t('validation.password_required', 'Mot de passe est obligatoire'))
    .min(6, t('validation.password_too_short', 'Mot de passe trop court')),
})

const PasswordForm = ({
  resetRequest,
  modifyPasswordUsingResetCodeRequest,
}) => {
  const { t } = useTranslation()
  const [submitClicked, setSubmitClicked] = useState(false)
  const onSubmit = async (values, { setSubmitting }) => {
    await modifyPasswordUsingResetCodeRequest({
      userId: resetRequest.user_id,
      resetCode: resetRequest.code,
      newPassword: values.password,
    })
    setSubmitting(false)
  }
  return (
    <View>
      <Formik
        validationSchema={formSchema}
        onSubmit={onSubmit}
        initialValues={{
          password: '',
        }}
      >
        {({ errors, values, handleChange, handleSubmit }) => (
          <>
            <TextInput
              label={t(
                'screen.reset_password.password_field_label',
                'Votre nouveau mot de passe'
              )}
              mode="flat"
              secureTextEntry
              textContentType="newPassword"
              error={submitClicked ? errors.password : undefined}
              value={values.password}
              onChangeText={handleChange('password')}
              autoFocus
            />
            <Button
              block
              onPress={(...args) => {
                setSubmitClicked(true)
                handleSubmit(...args)
              }}
            >
              <Text>{Translations.common.to_confirm}</Text>
            </Button>
          </>
        )}
      </Formik>
    </View>
  )
}

export default PasswordForm
