import React from 'react'
import type { TextInputProps } from 'react-native-paper';
import { TextInput as RNTextInput } from 'react-native-paper'

const TextInput = (props: TextInputProps) => {
  return <RNTextInput mode={'outlined'} {...props} />
}

export default TextInput
