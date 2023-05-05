import { Translations } from 'core/i18n'
import { Formik } from 'formik'
import { Button } from 'native-base'
import React, { useState } from 'react'
import { View } from 'react-native'
import TextInput from 'ui/components/common/TextInput'
import * as Yup from 'yup'

const formSchema = Yup.object().shape({
  email: Yup.string()
    .email('Veuillez entrer un e-mail valide')
    .required('Veuillez entrer un e-mail'),
})

const ForgetPasswordForm = ({ requestPasswordReset }) => {
  const [submitClicked, setSubmitClicked] = useState(false)
  const onSubmit = async (values, { setSubmitting }) => {
    await requestPasswordReset(values.email)
    setSubmitting(false)
  }
  return (
    <View>
      <Formik
        validationSchema={formSchema}
        onSubmit={onSubmit}
        initialValues={{
          email: '',
        }}
      >
        {({ errors, values, handleChange, handleSubmit }) => (
          <>
            <TextInput
              label={Translations.common.your_email}
              mode={'flat'}
              error={submitClicked ? errors.email : undefined}
              value={values.email}
              onChangeText={handleChange('email')}
              autoFocus
              style={{ marginBottom: 16 }}
            />
            <Button
              block
              onPress={(...args) => {
                setSubmitClicked(true)
                handleSubmit(...args)
              }}
            >
              {Translations.common.to_confirm}
            </Button>
          </>
        )}
      </Formik>
    </View>
  )
}

export default ForgetPasswordForm
