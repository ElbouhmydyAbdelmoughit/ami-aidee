import { Heading } from 'native-base'
import React, { useEffect, useRef, useState } from 'react'
import { Linking,View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'

const color = ['#3FEDFF', '#8772FF']

const useInitialURL = () => {
  const [url, setUrl] = useState(null)
  const processedRef = useRef(false)

  useEffect(() => {
    const getUrlAsync = async () => {
      if (processedRef.current) {
        return
      }
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL()
      setUrl(initialUrl)
      processedRef.current = true
    }

    getUrlAsync()
  }, [])

  return {
    url,
    markUrlAsUsed: () => {
      setUrl(null)
      processedRef.current = true
    },
    processedRef,
  }
}

const SplashScreen = ({ auth, fetchUser }) => {
  const { url: initialUrl, processedRef, markUrlAsUsed } = useInitialURL()
  const redirectedRef = useRef(false)

  useEffect(() => {
    console.log('SplashScreen: redirectedRef', redirectedRef.current)
    if (redirectedRef.current) {
      return
    }
    redirectedRef.current = true

    if (initialUrl && !processedRef.current) {
      if (initialUrl.indexOf('reset-password') !== -1) {
        const resetCode = initialUrl.substr(
          initialUrl.indexOf('reset-password') + 15
        )
        markUrlAsUsed()
        redirectedRef.current = true
        console.log('SplashScreen: redirecting to reset password')
        Actions.resetPassword(resetCode)
        return
      }
    }
    if (auth && auth.jwt) {
      fetchUser()
      redirectedRef.current = true
      console.log('SplashScreen: redirecting to root')
      Actions.root()
    } else {
      console.log('SplashScreen: redirecting to login')
      redirectedRef.current = true
      Actions.login()
    }
  }, [redirectedRef.current, initialUrl, auth && auth.jwt])

  return (
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
        <Heading size={'lg'} style={styles.title}>
          A.M.I
        </Heading>
      </View>
    </LinearGradient>
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
