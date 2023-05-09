import moment from 'moment'
import momentFR from 'moment/locale/fr'
import React from 'react'
import { Image,Text, View } from 'react-native'
import Video from 'react-native-video'

import styles from './styles'

const Preview = (onValidate, form, videoUri) => {
  // const componentDidMount = () =>  {
  //     //this.camera.changeCamera();
  // }

  // const validate = (uri) => {
  //     onValidate(uri)
  // }

  const renderVideoPreview = videoUri => {
    /**/
    return (
      <View style={styles.video}>
        <Video
          source={{ uri: videoUri }}
          ref={ref => {
            player = ref
          }} // Store reference
          style={styles.preview}
          controls={true}
        />
      </View>
    )
  }

  const renderBodyPreview = form => {
    const fr = moment().locale('fr', momentFR)
    const { name, activite, reccurence, location } = form
    const day = fr.format('dddd, MMMM Do YYYY')
    const hour = fr.format('HH:mm')
    const text = `Bonjour ${name}, nous sommes le ${day} il est ${hour}.\nPenser à  ${activite}, ${reccurence} ${form.moment} ${form.momentDate}\n${location}`
    return (
      <View style={styles.body}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
          {text}
        </Text>
        {form.imageURL && (
          <Image
            source={{ uri: form.imageURL }}
            style={{ width: '80%', height: '40%' }}
            resizeMode="cover"
          />
        )}
      </View>
    )
  }

  return (
    <View style={styles.preview}>
      {renderVideoPreview(videoUri)}
      {renderBodyPreview(form)}
    </View>
  )
}

export default Preview
