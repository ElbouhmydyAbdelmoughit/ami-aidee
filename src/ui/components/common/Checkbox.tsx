import React from 'react'
import { Platform, View } from 'react-native'
import type { CheckboxProps } from 'react-native-paper';
import { Checkbox as RNCheckbox } from 'react-native-paper'

const Checkbox = (props: CheckboxProps) => {
  if (Platform.OS === 'android') {
    return <RNCheckbox {...props} />
  }
  return (
    <View
      style={[
        props.style,
        {
          width: 32,
          height: 32,
          borderColor: 'white',
          borderWidth: 2,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
        },
      ]}
    >
      <RNCheckbox {...props} style={{ marginBottom: 2, borderRadius: 2 }} />
    </View>
  )
}

export default Checkbox
