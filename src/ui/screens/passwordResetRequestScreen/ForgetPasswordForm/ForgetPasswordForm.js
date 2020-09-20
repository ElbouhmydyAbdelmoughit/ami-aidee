import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { TextField } from 'react-native-material-textfield'
import { Button, Text } from 'native-base'
import { View } from 'react-native'

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
            <TextField
              label="Votre email"
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
              <Text>Confirmer</Text>
            </Button>
          </React.Fragment>
        )}
      </Formik>
    </View>
  )
}

export default ForgetPasswordForm
