import React, { useState, useEffect } from 'react';
import { Container, Header, Content, Title, Card, CardItem, H1, H2, H3 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import material from 'AMIaide/native-base-theme/variables/material';
import { Env } from 'src/utils/env'
import { solarDegree, moonDegree, times } from 'src/utils'
import Svg, {
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Image,
  Symbol,
  Text,
  Use,
  Defs,
  Stop,
  Pattern
} from 'react-native-svg';

export default ({ onPress, date, solarIcon, moonIcon }) => {

  console.log("SOLARVIEW")
  const [points, setPoints] = useState([])
  const [ellipseSize, setEllipseSize] = useState({
    width: 0,
    height: 0
  })
  const [point, setPoint] = useState({
    x: 0,
    y: 0
  })

  useEffect(() => {
    //setSunPos()
  }, [])

  /*const setSunPos = () => {
    if (points.length == 0) return

    const degree = solarDegree(date)
    console.log(`SolarView.degree: ${degree}`)
    updateWithAngle(degree)
  }
  
  const updateWithAngle = (angle) => {
    const pt = pointForAngle(angle)
    console.log(pt)
    update(pt)
  }*/

  const positionForDate = (date, isSolar) => {
    if (points.length == 0) return {
      x: 0,
      y: 0
    }

    const degree = isSolar == true ? solarDegree(date) : moonDegree(date)
    const point = pointForAngle(degree)

    const xCenter = ellipseSize.width // 50 / 100
    const yCenter = ellipseSize.height * 70 / 100
    const sunWidth = ellipseSize.width * 20 / 100
    const sunHeight = ellipseSize.height * 20 / 100

    //y: 870.8098158189582
    const x = (point.x) - (sunWidth / 2)
    const y = (point.y) - (sunHeight / 2)

    return {
      x: x,
      y: y
    }
  }

  const onLayout = (event) => {
    var { x, y, width, height } = event.nativeEvent.layout;
    console.log(`(${x} ; ${y}) | (${width} ; ${height})`)

    setEllipseSize({
      width: width,
      height: height
    })

    const cx = width * 50 / 100 // "50%"
    const cy = height //"100%"
    const rx = width * 50 / 100//"50%"
    const ry = height * 70 / 100//"70%"

    console.log(width * 50 / 100)
    console.log(height * 70 / 100)
    const points = getBorderPoints(cx, cy, rx, ry)
    console.log(points)
    setPoints(points)
    //setSunPos()
  }

  const pointForAngle = (angle) => {
    return points.reduce(function (prev, curr) {
      if (prev.angle == angle) return prev
      else if (curr.angle == angle) return curr
      else return (Math.abs(curr.angle - angle) < Math.abs(prev.angle - angle) ? curr : prev);
    });
  }

  const getBorderPoints = (cx, cy, rx, ry) => {
    let points = []
    var angleStep = 0.05, angle = angleStep;
    //ctx.moveTo(cx + rx, cy);                   // start at angle 0
    //console.log(angle)
    while (angle < Math.PI * 2) {
      points.push({
        x: cx + rx * Math.cos(angle),
        y: cy + ry * Math.sin(angle),
        angle: Math.ceil((angle * 180 / Math.PI))
      })

      angle += angleStep
      //console.log(angle)
    }
    return points
  }


  const position = positionForDate(date, true)
  const moonPosition = positionForDate(date, false)

  const color = ['#FFFFFF00', '#FFFFFF', '#FFFFFF00']
  return (
    <Svg
      onLayout={onLayout}
      height="100%"
      width="100%"
    >
      <Defs>
       <LinearGradient id="grad" 
       start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 1.0 }}
       colors={color}
       style={{ flex: 1 }}>
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
        x={moonPosition.x}
        y={moonPosition.y}
        width="20%"
        height="20%"
        fill="transparent"
        onPress={onPress}
      />
      {solarIcon != null && <Image
        x={position.x}
        y={position.y}
        width="20%"
        height="20%"
        preserveAspectRatio="xMidYMid meet"
        opacity="1"
        href={solarIcon}
    />}

    {moonIcon != null && <Image
        x={moonPosition.x}
        y={moonPosition.y}
        width="20%"
        height="20%"
        preserveAspectRatio="xMidYMid meet"
        opacity="1"
        href={moonIcon} 
      />}
    </Svg>
  );
}
