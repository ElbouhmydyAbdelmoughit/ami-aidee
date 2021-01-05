import React, { useState } from 'react'
import { Dimensions } from 'react-native'
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

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window')

const PADDING = 20
const SUN_WIDTH = WINDOW_WIDTH * 0.2
const SUN_HEIGHT = WINDOW_HEIGHT * 0.2
const CX = WINDOW_WIDTH / 2
const CY = WINDOW_HEIGHT - SUN_HEIGHT / 2 - PADDING
const RX = WINDOW_WIDTH / 2 - SUN_WIDTH / 4
const RY = WINDOW_HEIGHT * 0.55

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

const SolarView = ({
  onPress,
  date,
  solarIcon,
  moonIcon,
  times,
  helpedUser,
}) => {
  const [points, setPoints] = useState([])
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

    //y: 870.8098158189582
    const x = point.x - SUN_WIDTH / 2
    const y = point.y - SUN_HEIGHT / 2

    return {
      x,
      y,
    }
  }

  const onLayout = () => {
    const borderPoints = getBorderPoints(CX, CY, RX, RY)
    setPoints(borderPoints)
    //setSunPos()
  }

  const position = positionForDate(date)

  const color = ['#FFFFFF50', '#FFFFFF', '#FFFFFF50']
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
        cx={CX}
        cy={CY}
        rx={RX}
        ry={RY}
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
