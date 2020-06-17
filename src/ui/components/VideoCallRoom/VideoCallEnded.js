import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Headline, Button } from 'react-native-paper'
import Br from 'src/ui/components/br'
import { Actions } from 'react-native-router-flux'
import UserAvatar from '../UserAvatar'
import GradientBackground from '../GradientBackground'
import { getUserDisplayName } from '../../../utils/user'

const VideoCallEnded = ({ auxiliary }) => {
  const [countdown, setCountdown] = useState(3)
  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(cd => cd - 1)
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])
  useEffect(() => {
    if (countdown === 0) {
      Actions.pop()
    }
  }, [countdown])
  return (
    <GradientBackground>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            height: '100%',
            width: '100%',
          }}
        >
          <View style={{ flex: 1, marginTop: 64 }}>
            <UserAvatar user={auxiliary} />
            <View style={{ marginTop: 32, alignItems: 'center' }}>
              <Text
                style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}
              >
                {getUserDisplayName(auxiliary)} a raccroché
              </Text>
            </View>
          </View>
          <View style={{ marginBottom: 32, alignItems: 'center' }}>
            <Button
              onPress={() => {
                Actions.pop()
              }}
              color="white"
              labelStyle={{
                fontSize: 24,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                }}
              >
                Revenir dans {countdown} secondes
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </GradientBackground>
  )
}

export default VideoCallEnded
