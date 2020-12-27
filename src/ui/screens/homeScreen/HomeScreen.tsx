import React, { useState, useEffect, createRef } from 'react'
import { Container, Text, H1, Toast } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { Actions } from 'react-native-router-flux'
import { TouchableWithoutFeedback, View } from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

import { Env } from 'src/utils/env'
import { closestMessage, sortMessage } from 'src/utils'
import { Timer } from 'src/ui/components'

import VideoCard from './VideoCard'
import MessageCard from './MessageCard'
import NavigateCard from './NavigateCard'
import PictureCard from './PictureCard'

import useActivityLog from 'ui/hooks/use-activity-log'
import { TrackedActivity } from 'core/types'
import { Button, IconButton } from 'react-native-paper'

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
}) => {
  console.log(list)
  console.log(me)
  const logActivity = useActivityLog()
  const messages = Object.values(list).sort(sortMessage(now))
  const msg = closestMessage(messages || [], now)
  console.log(msg)
  const [message, setMessage] = useState(msg || {})
  //const [volume, setVolume] = useState(1)
  let videoRef = createRef()
  let timerRef = createRef()
  useEffect(() => {
    awake()
    messagesRequest(me.helped_users[0].id)
    if (redirectFromSolarView) {
      Toast.show({
        text: "Appuie sur l'écran pour revenir à la page d'accueil",
        buttonText: "D'accord",
        duration: 6000,
      })
    }
  }, [])

  const resetTimer = () => {
    console.log(timerRef)
    const tim = (timerRef && timerRef.current) || {}
    tim.reset()
  }

  const onVolumeChange = value => {
    console.log(value)
    //setVolume(value)

    videoRef.current?.setVolume(value)
    resetTimer()
  }

  const reload = () => {
    const video = (videoRef && videoRef.current) || {}
    video.reload()
    resetTimer()
  }

  const next = () => {
    const index = messages.indexOf(message)
    if (index == -1) {
      setMessage(messages[0])
    }
    if (messages.length > index + 1) {
      setMessage(messages[index + 1] || {})
    }
    resetTimer()
  }

  const previous = () => {
    const index = messages.indexOf(message)
    if (index == -1) {
      setMessage(messages[0])
    }
    if (index > 0) {
      setMessage(messages[index - 1] || {})
    }
    resetTimer()
  }

  const { video_url, picture_url } = message

  console.log(message)
  if ((message.id == null || message.id == undefined) && messages.length > 0) {
    // setMessage(messages[0] || {})
  }
  const videoURI = video_url ? `${Env.MEDIA_URL}/${video_url}` : ''
  console.log(video_url)
  console.log(videoURI)
  //{ uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }
  const imageURI = picture_url ? { uri: `${Env.MEDIA_URL}/${picture_url}` } : {}

  const color = ['#3FEDFF', '#8772FF']
  return (
    <Container>
      <Timer ref={timerRef} mode={'awake'} />
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
          <IconButton
            size={40}
            style={{
              position: 'absolute',
              left: 12,
              top: 0,
              width: 60,
              marginBottom: 16,
            }}
            color="white"
            icon="arrow-back"
            onPress={() => {
              logActivity(TrackedActivity.RETURN_FROM_REMINDER_LIST)
              Actions.pop()
            }}
          />
          {messages.length == 0 && (
            <View style={{ alignItems: 'center' }}>
              <H1 style={styles.title}>{'Pas de nouveau messages'}</H1>
              <Button
                mode="outlined"
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
                  Retour
                </Text>
              </Button>
            </View>
          )}
          {messages.length > 0 && (
            <Grid style={{ padding: 30, paddingTop: 0 }}>
              <Col size={25}>
                <Row size={50} style={{ paddingTop: 60 }}>
                  <VideoCard ref={videoRef} uri={videoURI} />
                </Row>
                <Row size={50}>
                  <NavigateCard
                    current={messages.indexOf(message) + 1}
                    total={messages.length}
                    onNext={next}
                    onPrevious={previous}
                    onReload={reload}
                    onVolumeChange={onVolumeChange}
                  />
                </Row>
              </Col>

              <Col size={2}></Col>
              <Col size={70}>
                <Row size={40}>
                  <MessageCard me={me} message={message} />
                </Row>
                <Row size={3}></Row>
                <Row size={45}>
                  <PictureCard uri={imageURI} message={message} />
                </Row>
              </Col>
            </Grid>
          )}
        </LinearGradient>
      </TouchableWithoutFeedback>
    </Container>
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
