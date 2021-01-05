import { Image } from 'native-base'
import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  View,
  findNodeHandle,
  UIManager,
  Dimensions,
  Image as RNImage,
  TouchableOpacity,
} from 'react-native'
import { withNavigationFocus } from 'react-navigation'
import { IconButton } from 'react-native-paper'

const animateTiming = (animation: any, toValue: number) => {
  return Animated.timing(animation, {
    toValue: toValue,
    duration: 200,
    useNativeDriver: true,
  })
}
const ZoomableImage = ({ uri, zooming, onUnzoom, onZoom, isFocused }) => {
  const animateScale = useRef(new Animated.Value(0)).current
  const animateTranslateX = useRef(new Animated.Value(0)).current
  const animateTranslateY = useRef(new Animated.Value(0)).current
  const viewRef = useRef()
  const [imageMeasurements, setImageMeasurements] = useState([1, 1, 1, 1, 1, 1])
  const [debouncedZooming, setDebouncedZooming] = useState(zooming)
  useEffect(() => {
    if (!viewRef.current || !isFocused) {
      return
    }
    setTimeout(() => {
      UIManager.measure(findNodeHandle(viewRef.current), (...args) => {
        console.log(args)
        if (args[4] < 100 || args[5] < 100) {
          return
        }
        setImageMeasurements(args)
      })
    }, 0)
  }, [viewRef.current, isFocused, uri])
  const scale = Math.min(
    Dimensions.get('window').width / imageMeasurements[2],
    Dimensions.get('window').height / imageMeasurements[3]
  )
  console.log('window dimensions', Dimensions.get('window'))
  console.log(scale)
  useEffect(() => {
    if (zooming) {
      Animated.parallel([
        animateTiming(animateScale, 1),
        animateTiming(animateTranslateX, 1),
        animateTiming(animateTranslateY, 1),
      ]).start()
      setTimeout(() => {
        setDebouncedZooming(true)
      }, 200)
    } else {
      animateTranslateX.setValue(0)
      animateTranslateY.setValue(0)
      animateScale.setValue(0)
      setDebouncedZooming(false)
    }
  }, [zooming])
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flex: 1,

        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
      }}
      activeOpacity={0.9}
      onPress={() => {
        if (zooming) {
          onUnzoom()
        } else {
          onZoom()
        }
      }}
    >
      <Animated.Image
        ref={ref => (viewRef.current = ref)}
        source={uri}
        style={{
          flex: 1,
          zIndex: debouncedZooming || zooming ? 200 : 0,
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.9)',
          opacity: 1,
          transform: [
            {
              translateY: animateTranslateY.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  0,
                  Dimensions.get('window').height / 2 -
                    imageMeasurements[3] / 2 -
                    imageMeasurements[5],
                ],
              }),
            },
            {
              translateX: animateTranslateX.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  0,
                  Dimensions.get('window').width / 2 -
                    imageMeasurements[2] / 2 -
                    imageMeasurements[4],
                ],
              }),
            },
            {
              scale: animateScale.interpolate({
                inputRange: [0, 1],
                outputRange: [1, scale],
              }),
            },
          ],
        }}
        resizeMode="contain"
      />
      <View
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          left: 0,
          alignItems: 'flex-end',
        }}
      >
        <IconButton
          icon="zoom-out-map"
          size={40}
          onPress={() => {
            onZoom()
          }}
          style={{
            width: 40,
            height: 40,
          }}
          color="white"
        />
      </View>
    </TouchableOpacity>
  )
}

export default withNavigationFocus(ZoomableImage)
