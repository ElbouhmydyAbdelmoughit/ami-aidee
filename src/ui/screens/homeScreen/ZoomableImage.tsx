import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  findNodeHandle,
  UIManager,
  Dimensions,
  Image as RNImage,
  TouchableOpacity,
} from 'react-native'
import { IconButton } from 'react-native-paper'

const ZoomableImage = ({ uri, zooming, onUnzoom, onZoom }) => {
  const viewRef = useRef()
  const [imageMeasurements, setImageMeasurements] = useState([1, 1, 1, 1, 1, 1])

  const [imageMeasured, setImageMeasured] = useState(false)

  useEffect(() => {
    console.log('reset image measured', imageMeasured)
    if (imageMeasured) {
      setImageMeasured(false)
    }
  }, [uri.uri])
  useEffect(() => {
    if (!viewRef.current || imageMeasured) {
      return
    }
    setImageMeasured(true)

    setTimeout(() => {
      UIManager.measure(findNodeHandle(viewRef.current), (...args) => {
        if (args[4] < 20 || args[5] < 20) {
          return
        }
        setImageMeasurements(args)
      })
    }, 600)
  }, [viewRef.current, imageMeasured])

  return (
    <TouchableOpacity
      style={{
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flex: 1,
        borderBottomLeftRadius: 16,
        backgroundColor: 'rgba(0,0,0,0.8)',

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
      <RNImage
        ref={ref => (viewRef.current = ref)}
        source={uri}
        style={[
          {
            flex: 1,
            width: '100%',
            zIndex: zooming ? 200 : 0,
            opacity: 1,
          },
          zooming && {
            flex: undefined,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            transform: [
              {
                translateY: -imageMeasurements[5],
              },
              {
                translateX: -imageMeasurements[4],
              },
            ],
          },
        ]}
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
          disabled={imageMeasured}
          icon="zoom-out-map"
          size={40}
          onPress={() => {
            onZoom()
          }}
          style={{
            width: 40,
            height: 40,
            opacity: imageMeasured ? 1 : 0,
          }}
          color="white"
        />
      </View>
    </TouchableOpacity>
  )
}

export default ZoomableImage
