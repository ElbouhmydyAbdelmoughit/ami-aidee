import { Translations } from 'core/i18n'
import _ from 'lodash'
import moment from 'moment'
import React, { useEffect, useRef } from 'react'
import { StyleSheet,Text, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux'
import { AuthSelectors } from 'store/auth'
import BacktoRootTimer from 'ui/components/BackToRootTimer'
import { times } from 'utils'
import colorUtils from 'utils/colors'

import ChatRoom from '../../components/ChatRoom'
import GradientBackground from '../../components/GradientBackground'
import useActivityLog from '../../hooks/use-activity-log'
import MessageUpdater from './MessageUpdater'
import MessagingNavBar from './MessagingNavBar'

const styles = StyleSheet.create({
  box: {
    width: 150,
    shadowRadius: 2,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'white',
    padding: 16,
    margin: 32,
    marginBottom: 0,
    justifyContent: 'center',
    height: 150,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
  },
})

const MessagingScreen = ({
  auxiliary,
  updateLastReadRequest,
  messagesRequest,
}) => {
  const dispatch = useDispatch()
  const currentHelpedUser = useSelector(AuthSelectors.getCurrentHelpedUser)
  const logActivity = useActivityLog()
  useEffect(() => {
    updateLastReadRequest(auxiliary)
    return () => {
      updateLastReadRequest(auxiliary)
    }
  }, [])

  const time = times(moment(), currentHelpedUser)
  const textColor = colorUtils.getTextColor(time)
  const timerRef = useRef()
  return (
    <BacktoRootTimer timerRef={timerRef}>
      <GradientBackground>
        <MessageUpdater messagesRequest={messagesRequest} />
        <View style={{ height: '100%', flexDirection: 'column' }}>
          <MessagingNavBar user={auxiliary} textColor={textColor} />
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
              <ChatRoom
                auxiliary={auxiliary}
                onAction={() => {
                  timerRef.current && timerRef.current.reset()
                }}
              />
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
                    borderColor: textColor,
                  })}
                >
                  <Icon name="videocam" color={textColor} size={60} />
                  <Text
                    style={{
                      color: textColor,
                      fontSize:
                        Translations.common.video_call.length > 10 ? 16 : 20,
                      fontWeight: 'bold',
                    }}
                  >
                    {Translations.common.video_call}
                  </Text>
                </View>
              </TouchableRipple>
              {/* <TouchableRipple
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
            </TouchableRipple> */}
            </View>
          </View>
        </View>
      </GradientBackground>
    </BacktoRootTimer>
  )
}

export default MessagingScreen
