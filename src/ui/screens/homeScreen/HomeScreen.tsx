import { Translations } from 'core/i18n'
import { TrackedActivity } from 'core/types'
import { Heading, Text, Toast } from 'native-base'
import React, { createRef, useEffect, useRef,useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableWithoutFeedback, View } from 'react-native'
import { Col, Grid,Row } from 'react-native-easy-grid'
import LinearGradient from 'react-native-linear-gradient'
import { Button, IconButton } from 'react-native-paper'
import { Actions } from 'react-native-router-flux'
import { closestMessage, sortMessage } from 'src/utils'
import { Env } from 'src/utils/env'
import { CircleButton } from 'ui/components'
import BacktoRootTimer from 'ui/components/BackToRootTimer'
import useActivityLog from 'ui/hooks/use-activity-log'
import { RETURN_TO_HOME_DURATION } from 'utils/constant'

import MessageCard from './MessageCard'
import NavigateCard from './NavigateCard'
import VideoCard from './VideoCard'

/**
 *
 * - Get only today messages (filter with moment().dayOfYear())
 * - Timer global
 *  - après 3 minutes => mode veille
 *  - si tap sur veille alors show accueilScreen
 *  - Ajouter un bouton Replay
 */
const HomeScreen = ({
  awake,
  messagesRequest,
  list,
  now,
  me,
  redirectFromSolarView,
  returnToHomeState,
}) => {
  console.log(list)
  console.log(me)
  const logActivity = useActivityLog()
  const messages = Object.values(list).sort(sortMessage(now))
  const msg = closestMessage(messages || [], now)
  console.log(msg)
  const [message, setMessage] = useState(msg || {})
  // const [volume, setVolume] = useState(1)
  const videoRef = createRef()
  const { t } = useTranslation()
  useEffect(() => {
    awake()
    if (me?.helped_users?.[0]?.id) {
      messagesRequest(me?.helped_users?.[0]?.id)
    }
    if (redirectFromSolarView) {
      Toast.show({
        text: t(
          'screen.reminders_list.go_back_instruction',
          "Appuie sur l'écran pour revenir à la page d'accueil"
        ),
        buttonText: Translations.common.ok,
        duration: 6000,
      })
    }
  }, [])

  const onVolumeChange = value => {
    console.log(value)
    // setVolume(value)

    videoRef.current?.setVolume(value)
    timerRef.current?.reset()
  }

  const reload = () => {
    const video = (videoRef && videoRef.current) || {}
    video.reload()
    timerRef.current?.reset()
  }

  const next = () => {
    const index = messages.indexOf(message)
    if (index == -1) {
      setMessage(messages[0])
    }
    if (messages.length > index + 1) {
      setMessage(messages[index + 1] || {})
    }
    timerRef.current?.reset()
  }

  const previous = () => {
    const index = messages.indexOf(message)
    if (index == -1) {
      setMessage(messages[0])
    }
    if (index > 0) {
      setMessage(messages[index - 1] || {})
    }
    timerRef.current?.reset()
  }

  const { video_url, picture_url } = message

  console.log(message)
  if ((message.id == null || message.id == undefined) && messages.length > 0) {
    // setMessage(messages[0] || {})
  }
  const videoURI = video_url ? `${Env.MEDIA_URL}/${video_url}` : ''
  console.log(video_url)
  console.log(videoURI)
  // { uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }
  const imageURI = picture_url ? { uri: `${Env.MEDIA_URL}/${picture_url}` } : {}

  const color = ['#3FEDFF', '#8772FF']
  const [zooming, setZooming] = useState(false)
  const timerRef = useRef()
  return (
    <BacktoRootTimer
      timerRef={timerRef}
      duration={
        returnToHomeState === 'after_2_min'
          ? 2 * RETURN_TO_HOME_DURATION
          : RETURN_TO_HOME_DURATION
      }
    >
      {zooming && (
        <>
          <IconButton
            icon={'close'}
            color={'#555'}
            size={60}
            style={{
              position: 'absolute',
              right: 32,
              top: 48,
              zIndex: 201,
              width: 60,
              height: 60,
              backgroundColor: 'white',
              borderRadius: 30,
            }}
            onPress={() => {
              setZooming(false)
              timerRef.current?.reset()
            }}
          />
        </>
      )}
      <TouchableWithoutFeedback
        onPress={() => {
          if (redirectFromSolarView) {
            logActivity(
              TrackedActivity.RETURN_FROM_REMINDER_LIST_ON_SCREEN_PRESS
            )
            Actions.accueil()
          }
        }}
      >
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}
          colors={color}
          style={{ flex: 1 }}
        >
          {messages.length == 0 && (
            <View style={{ alignItems: 'center' }}>
              <Heading size={'xl'} style={styles.title}>
                {t(
                  'screen.reminders_list.no_new_messages',
                  'Pas de nouveau messages'
                )}
              </Heading>
              <Button
                mode={'outlined'}
                style={{ borderColor: 'white' }}
                onPress={() => {
                  logActivity(TrackedActivity.RETURN_FROM_REMINDER_LIST)
                  Actions.pop()
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    textTransform: 'uppercase',
                    fontSize: 18,
                  }}
                >
                  {Translations.common.go_back}
                </Text>
              </Button>
            </View>
          )}
          {messages.length > 0 && (
            <Grid style={{ paddingHorizontal: 30, marginTop: 32 }}>
              <Row size={100}>
                <Col size={30}>
                  <View style={{ flex: 1, marginTop: 56 }}>
                    <View
                      style={{
                        backgroundColor: 'black',
                        borderRadius: 16,
                        flex: 1,
                        paddingTop: 16,
                        maxWidth: 500,
                      }}
                    >
                      <View style={{ flex: 1, backgroundColor: 'black' }}>
                        <VideoCard ref={videoRef} uri={videoURI} />
                      </View>
                      <NavigateCard
                        onReload={reload}
                        onVolumeChange={onVolumeChange}
                      />
                    </View>
                  </View>
                </Col>
                <Col
                  size={70}
                  style={{
                    marginLeft: 16,
                    alignItems: 'center',
                  }}
                >
                  <Row size={50}>
                    <MessageCard
                      onUnzoom={() => {
                        setZooming(false)
                      }}
                      me={me}
                      message={message}
                      uri={imageURI}
                      zooming={zooming}
                      onZoom={() => {
                        setZooming(true)
                      }}
                    />
                  </Row>
                </Col>
              </Row>
              <View
                style={{
                  height: 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginVertical: 15,
                }}
              >
                {!zooming && (
                  <>
                    <CircleButton
                      onPress={(...args) => {
                        logActivity('prev_reminder')
                        previous(...args)
                      }}
                      size={60}
                      source={require('src/assets/images/back.png')}
                    />
                    <Heading
                      style={{ color: '#fff', marginHorizontal: 8 }}
                    >{`${messages.indexOf(message) + 1} / ${
                      messages.length
                    }`}</Heading>
                    <CircleButton
                      onPress={(...args) => {
                        logActivity('next_reminder')
                        next(...args)
                        timerRef.current?.reset()
                      }}
                      size={60}
                      source={require('src/assets/images/next.png')}
                    />
                  </>
                )}
              </View>
            </Grid>
          )}
          <IconButton
            size={30}
            style={{
              position: 'absolute',
              left: 30,
              top: 16,
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: 'white',
              marginBottom: 16,
            }}
            color={'#555'}
            icon={'arrow-left'}
            onPress={() => {
              logActivity(TrackedActivity.RETURN_FROM_REMINDER_LIST)
              Actions.pop()
            }}
          />
        </LinearGradient>
      </TouchableWithoutFeedback>
    </BacktoRootTimer>
  )
}

const styles = {
  title: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    paddingTop: 80,
    textAlign: 'center',
    height: 120,
    marginBottom: 24,
  },
}

export default HomeScreen
