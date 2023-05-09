import React, { useEffect,useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text,View } from 'react-native'
import { Button } from 'react-native-paper'
import { Actions } from 'react-native-router-flux'
import useTextColor from 'ui/hooks/use-text-color'

import { getUserDisplayName } from '../../../utils/user'
import useActivityLog from '../../hooks/use-activity-log'
import GradientBackground from '../GradientBackground'
import UserAvatar from '../UserAvatar'

const VideoCallEnded = ({ auxiliary }) => {
  const logActivity = useActivityLog()
  const [countdown, setCountdown] = useState(3)
  const textColor = useTextColor()
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
  const { t } = useTranslation()
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
            <UserAvatar user={auxiliary} textColor={textColor} />
            <View style={{ marginTop: 32, alignItems: 'center' }}>
              <Text
                style={{ color: textColor, fontSize: 24, fontWeight: 'bold' }}
              >
                {t('screen.video_call.hung_up', {
                  defaultValue: '{{name}} a raccroché',
                  name: getUserDisplayName(auxiliary),
                })}
              </Text>
            </View>
          </View>
          <View style={{ marginBottom: 32, alignItems: 'center' }}>
            <Button
              onPress={() => {
                logActivity('press_end_video_call_btn')
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
                  color: textColor,
                }}
              >
                {t('screen.video_call.return_in_secs', {
                  defaultValue: ' Revenir dans {{count}} seconde',
                  count: countdown,
                })}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </GradientBackground>
  )
}

export default VideoCallEnded
