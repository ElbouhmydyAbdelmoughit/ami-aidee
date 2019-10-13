import React, { useState, useEffect, createRef } from 'react';
import { Container, Header, View, Icon, Content, Form, Item, Input, Label, Button, Text, Body, Title, Card, CardItem, H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import LinearGradient from 'react-native-linear-gradient';

import { Env } from 'src/utils/env'

import VideoCard from './VideoCard'
import MessageCard from './MessageCard'
import NavigateCard from './NavigateCard'
import PictureCard from './PictureCard'

import moment from 'moment'

/**
 * 
 * - Get only today messages (filter with moment().dayOfYear())
 * - Timer global
 *  - après 3 minutes => mode veille
 *  - si tap sur veille alors show accueilScreen
 *  - Ajouter un bouton Replay
 */
export default ({ messagesRequest, list, loading, me }) => {

  console.log(list)
  console.log(me)

  const sortMessage = (a, b) => {
    //2019-10-10T00:00:00
    const aStr = `${a.diffusion_start_date.split('T')[0]}T${a.moment_time}`
    const bStr = `${b.diffusion_start_date.split('T')[0]}T${b.moment_time}`
    const aDate = moment(aStr)
    const bDate = moment(bStr)
    return aDate.unix() - bDate.unix()
  }

  const messages = Object.values(list).sort(sortMessage)
  const [message, setMessage] = useState(messages[0] || {})
  //const [volume, setVolume] = useState(1)

  const videoRef = createRef()

  useEffect(() => {
    messagesRequest({})
  }, [])


  const onVolumeChange = (value) => {
    console.log(value)
    //setVolume(value)

    video = videoRef && videoRef.current || {}
    video.setVolume(value)
  }

  const reload = () => {
    video = videoRef && videoRef.current || {}
    video.reload()
  }

  const next = () => {
    const index = messages.indexOf(message)
    if (index == -1) {
      setMessage(messages[0])
    }
    if (messages.length > index) {
      setMessage(messages[index + 1] || {})
    }
  }

  const previous = () => {
    const index = messages.indexOf(message)
    if (index == -1) {
      setMessage(messages[0])
    }
    if (index > 0) {
      setMessage(messages[index - 1] || {})
    }
  }

  const { video_url, picture_url } = message

  console.log(message)
  if ((message.id == null || message.id == undefined) && messages.length > 0) {
   // setMessage(messages[0] || {})
  }
  const videoURI = (video_url) ? `${Env.API_URL}/${video_url}` : ''
  console.log(video_url)
  console.log(videoURI)
  //{ uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }
  const imageURI = (picture_url) ? { uri: `${Env.API_URL}/${picture_url}` } : {}

  const color = ['#3FEDFF', '#8772FF']
  return (
    <Container>
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 1.0 }}
        colors={color}
        style={{ flex: 1 }}>
          {messages.length == 0 && <H1 style={styles.title}>{"Pas de nouveau messages"}</H1>}
        {messages.length > 0 && <Grid style={{ padding: 30 }}>
          <Col size={25}>
            <Row size={50}>
              <VideoCard ref={videoRef} uri={videoURI} />
            </Row>
            <Row size={50}>
              <NavigateCard
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
              <MessageCard
                me={me}
                message={message} />
            </Row>
            <Row size={3}></Row>
            <Row size={45}>
              <PictureCard
                uri={imageURI} />
            </Row>
          </Col>
        </Grid>}
      </LinearGradient>
    </Container>
  );
}

const styles = {

  title: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontSize: 80,
    paddingTop: 80,
    textAlign:'center',
    height: 120
  }
}