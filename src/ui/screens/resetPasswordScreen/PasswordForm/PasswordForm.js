import React, { useState } from 'react'
import { Button, Text } from 'native-base'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { TextField } from 'react-native-material-textfield'
import { View } from 'react-native'

const formSchema = Yup.object().shape({
  password: Yup.string()
    .required('Mot de passe est obligatoire')
    .min(6, 'Mot de passe trop court'),
})

const PasswordForm = ({
  resetRequest,
  modifyPasswordUsingResetCodeRequest,
}) => {
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
          <React.Fragment>
            <TextField
              label="Votre nouveau mot de passe"
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
              <Text>Confirmer</Text>
            </Button>
          </React.Fragment>
        )}
      </Formik>
    </View>
  )
}

export default PasswordForm
