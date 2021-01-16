import React, { useEffect, useState } from 'react'
import { View, Linking } from 'react-native'
import { Actions } from 'react-native-router-flux'

import { Container, Content, Text, H1 } from 'native-base'
import material from 'AMIaide/native-base-theme/variables/material'
import LinearGradient from 'react-native-linear-gradient'

const color = ['#3FEDFF', '#8772FF']

const useMount = func => useEffect(() => func(), [])

let urlUsed = false
const useInitialURL = () => {
  const [url, setUrl] = useState(null)
  const [processing, setProcessing] = useState(true)

  useMount(() => {
    const getUrlAsync = async () => {
      if (urlUsed) {
        setProcessing(false)
        return
      }
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL()
      console.log('linking', initialUrl)
      setUrl(initialUrl)
      setProcessing(false)
    }

    getUrlAsync()
  })

  return {
    url,
    markUrlAsUsed: () => {
      setUrl(null)
      urlUsed = true
    },
    processing,
  }
}

const SplashScreen = ({ auth, fetchUser }) => {
  const {
    url: initialUrl,
    processing: processingInitialUrl,
    markUrlAsUsed,
  } = useInitialURL()

  useEffect(() => {
    if (initialUrl) {
      if (initialUrl.indexOf('reset-password') !== -1) {
        const resetCode = initialUrl.substr(
          initialUrl.indexOf('reset-password') + 15
        )
        markUrlAsUsed()
        Actions.resetPassword(resetCode)
        return
      }
    }
    if (auth && auth.jwt) {
      fetchUser()
      Actions.root()
    } else Actions.login()
  }, [processingInitialUrl, auth])

  return (
    <Container>
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        colors={color}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'transparent',
          }}
        >
          <H1 style={styles.title}>{'A.M.I'}</H1>
        </View>
      </LinearGradient>
    </Container>
  )
}

const styles = {
  title: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontSize: 80,
    paddingTop: 80,
    textAlign: 'center',
    height: 120,
  },
}

export default SplashScreen
