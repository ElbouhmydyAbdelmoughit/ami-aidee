import React, { useState, useEffect, createRef } from 'react';
import { Container, Header, View, Icon, Content, Form, Item, Input, Label, Button, Text, Body, Title, Card, CardItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import LinearGradient from 'react-native-linear-gradient';

import { Env } from 'src/utils/env'

import VideoCard from './VideoCard'
import MessageCard from './MessageCard'
import NavigateCard from './NavigateCard'
import PictureCard from './PictureCard'

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

  const messages = Object.values(list)
  const [message, setMessage] = useState(messages[0] || {})
  //const [volume, setVolume] = useState(1)

  const videoRef = createRef()

  useEffect(() => {
    messagesRequest({})
  }, [])


  const onVolumeChange = (value) => {
    video = videoRef && videoRef.current || {}
    console.log(video)
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
    setMessage(messages[0] || {})
  }
  const videoURI = (video_url) ? `${Env.API_URL}/${video_url}` : ''
  console.log(video_url)
  console.log(videoURI)
  { uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }
  const imageURI = (picture_url) ? { uri: `${Env.API_URL}/${picture_url}` } : {}

  const color = ['#3FEDFF', '#8772FF']
  return (
    <Container>
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 1.0 }}
        colors={color}
        style={{ flex: 1 }}>
   
      </LinearGradient>
    </Container>
  );
}
