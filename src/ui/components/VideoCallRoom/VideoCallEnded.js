import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Headline, Button } from 'react-native-paper'
import Br from 'src/ui/components/br'
import { Actions } from 'react-native-router-flux'
import UserAvatar from '../UserAvatar'
import GradientBackground from '../GradientBackground'
import { getUserDisplayName } from '../../../utils/user'

const VideoCallEnded = ({ auxiliary }) => {
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
              <Text style={{ color: 'white' }}>
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
            >
              Revenir
            </Button>
          </View>
        </View>
      </View>
    </GradientBackground>
  )
}

export default VideoCallEnded
