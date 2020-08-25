import React, { useState } from 'react'

import { solarDegree, moonDegree } from 'src/utils'
import Svg, {
  Ellipse,
  LinearGradient,
  Rect,
  Image,
  Defs,
  Stop,
} from 'react-native-svg'
import useActivityLog from '../../hooks/use-activity-log'

const SolarView = ({
  onPress,
  date,
  solarIcon,
  moonIcon,
  times,
  helpedUser,
}) => {
  const [points, setPoints] = useState([])
  const [ellipseSize, setEllipseSize] = useState({
    width: 0,
    height: 0,
  })
  const logActivity = useActivityLog()
  const positionForDate = dateInput => {
    if (points.length === 0) {
      return {
        x: 0,
        y: 0,
      }
    }

    const pointForAngle = angle => {
      return points.reduce((prev, curr) => {
        if (prev.angle === angle) return prev
        if (curr.angle === angle) return curr

        return Math.abs(curr.angle - angle) < Math.abs(prev.angle - angle)
          ? curr
          : prev
      })
    }
    const degree =
      times !== 'NIGHT'
        ? solarDegree(dateInput, helpedUser)
        : moonDegree(dateInput, helpedUser)
    const point = pointForAngle(degree)

    const sunWidth = (ellipseSize.width * 20) / 100
    const sunHeight = (ellipseSize.height * 20) / 100

    //y: 870.8098158189582
    const x = point.x - sunWidth / 2
    const y = point.y - sunHeight / 2

    return {
      x,
      y,
    }
  }

  const getBorderPoints = (cx, cy, rx, ry) => {
    const borderPoints = []
    const angleStep = 0.05
    let angle = angleStep
    while (angle < Math.PI * 2) {
      borderPoints.push({
        x: cx + rx * Math.cos(angle),
        y: cy + ry * Math.sin(angle),
        angle: Math.ceil((angle * 180) / Math.PI),
      })

      angle += angleStep
    }
    return borderPoints
  }

  const onLayout = event => {
    const { width, height } = event.nativeEvent.layout

    setEllipseSize({
      width,
      height,
    })

    const cx = (width * 50) / 100 // "50%"
    const cy = height //"100%"
    const rx = (width * 50) / 100 //"50%"
    const ry = (height * 70) / 100 //"70%"

    const borderPoints = getBorderPoints(cx, cy, rx, ry)
    setPoints(borderPoints)
    //setSunPos()
  }

  const position = positionForDate(date)

  const color = ['#FFFFFF00', '#FFFFFF', '#FFFFFF00']
  return (
    <Svg onLayout={onLayout} height="100%" width="100%">
      <Defs>
        <LinearGradient
          id="grad"
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}
          colors={color}
          style={{ flex: 1 }}
        >
          <Stop offset="0" stopColor="white" stopOpacity="0" />
          <Stop offset="0.5" stopColor="white" stopOpacity="0.4" />
          <Stop offset="1" stopColor="white" stopOpacity="0" />
        </LinearGradient>
      </Defs>
      <Ellipse
        cx="50%"
        cy="100%"
        rx="50%"
        ry="70%"
        stroke="url(#grad)"
        strokeWidth="3"
        fill="transparent"
      />
      <Rect
        x={position.x}
        y={position.y}
        width="20%"
        height="20%"
        fill="transparent"
        onPress={(...args) => {
          logActivity('press_rect_icon')
          onPress(...args)
        }}
      />
      {solarIcon != null && (
        <Image
          x={position.x}
          y={position.y}
          width="20%"
          height="20%"
          preserveAspectRatio="xMidYMid meet"
          opacity="1"
          href={solarIcon}
          onPress={(...args) => {
            logActivity('press_solar_icon')
            onPress(...args)
          }}
        />
      )}

      {moonIcon != null && (
        <Image
          x={position.x}
          y={position.y}
          width="20%"
          height="20%"
          preserveAspectRatio="xMidYMid meet"
          opacity="1"
          href={moonIcon}
          onPress={(...args) => {
            onPress(...args)
            logActivity('press_moon_icon')
          }}
        />
      )}
    </Svg>
  )
}

export default SolarView
