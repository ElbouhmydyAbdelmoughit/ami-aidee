import React, { useState } from 'react'

import { Text } from 'react-native';
export default ({}) => {

const [title, setTitle] = useState("TEST")

return (
  <Text>{title}</Text>
)
}