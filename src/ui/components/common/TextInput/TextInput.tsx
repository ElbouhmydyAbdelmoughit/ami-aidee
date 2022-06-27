import React from 'react'
import { TextInput as RNTextInput, TextInputProps } from 'react-native-paper'

const TextInput = (props: TextInputProps) => {
  return <RNTextInput mode="outlined" {...props} />
}

export default TextInput
