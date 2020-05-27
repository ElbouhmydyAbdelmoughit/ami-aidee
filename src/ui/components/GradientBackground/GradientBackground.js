import React from 'react'

import moment from 'moment'
import LinearGradient from 'react-native-linear-gradient'
import { times } from 'src/utils'
import { getGradientColors } from '../../../utils/colors'

const GradientBackground = ({ children, helpedUser }) => {
  const time = times(moment(), helpedUser)
  const gradientColors = getGradientColors(time)
  return (
    <LinearGradient
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 0.0, y: 1.0 }}
      colors={gradientColors}
      style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  )
}

export default GradientBackground
