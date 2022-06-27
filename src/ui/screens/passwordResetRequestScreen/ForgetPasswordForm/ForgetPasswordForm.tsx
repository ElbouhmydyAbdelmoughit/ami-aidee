import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Button, Text } from 'native-base'
import { View } from 'react-native'
import { Translations } from 'core/i18n'
import TextInput from 'ui/components/common/TextInput'

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
          <React.Fragment>
            <TextInput
              label={Translations.common.your_email}
              mode="flat"
              error={submitClicked ? errors.email : undefined}
              value={values.email}
              onChangeText={handleChange('email')}
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
          </React.Fragment>
        )}
      </Formik>
    </View>
  )
}

export default ForgetPasswordForm
