import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import _ from 'lodash'
import { TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Actions } from '@ami-app/react-native-router-flux'
import GradientBackground from '../../components/GradientBackground'
import MessagingNavBar from './MessagingNavBar'
import ChatRoom from '../../components/ChatRoom'
import MessageUpdater from './MessageUpdater'
import useActivityLog from '../../hooks/use-activity-log'

const styles = StyleSheet.create({
  box: {
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'white',
    shadowOpacity: 1,
    shadowRadius: 2,
    borderRadius: 4,
    padding: 16,
    margin: 32,
    marginBottom: 0,
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const MessagingScreen = ({
  auxiliary,
  updateLastReadRequest,
  messagesRequest,
}) => {
  const logActivity = useActivityLog()
  useEffect(() => {
    updateLastReadRequest(auxiliary)
    return () => {
      updateLastReadRequest(auxiliary)
    }
  }, [])

  return (
    <GradientBackground>
      <MessageUpdater messagesRequest={messagesRequest} />
      <View style={{ height: '100%', flexDirection: 'column' }}>
        <MessagingNavBar user={auxiliary} />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(255,255,255,0.6)',
              borderRadius: 16,
              marginLeft: 16,
              marginBottom: 48,
            }}
          >
            <ChatRoom auxiliary={auxiliary} />
          </View>
          <View>
            <TouchableRipple
              onPress={_.debounce(() => {
                logActivity('start_video_call')
                Actions.push('videoCall', { auxiliary, startMode: 'video' })
              }, 400)}
            >
              <View
                style={StyleSheet.compose(styles.box, {
                  marginTop: 0,
                })}
              >
                <Icon name="videocam" color="white" size={60} />
                <Text
                  style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
                >
                  Appel vidéo
                </Text>
              </View>
            </TouchableRipple>
            {/*<TouchableRipple
              onPress={() => {
                logActivity('start_audio_call')
                Actions.push('videoCall', { auxiliary, startMode: 'audio' })
              }}
            >
              <View style={styles.box}>
                <Icon name="call" color="white" size={60} />
                <Text
                  style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
                >
                  Appel audio
                </Text>
              </View>
            </TouchableRipple>*/}
          </View>
        </View>
      </View>
    </GradientBackground>
  )
}

export default MessagingScreen
