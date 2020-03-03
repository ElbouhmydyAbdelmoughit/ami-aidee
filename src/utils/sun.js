//is dawn
//is sunNoon
//is dusk
//is night

/**
 * 
dawn: Mon Sep 02 2019 06:36:49 GMT+0200 (heure d’été d’Europe centrale) {}
sunrise: Mon Sep 02 2019 07:09:34 GMT+0200 (heure d’été d’Europe centrale) {}
sunriseEnd: Mon Sep 02 2019 07:12:53 GMT+0200 (heure d’été d’Europe centrale)

solarNoon: Mon Sep 02 2019 13:51:58 GMT+0200 (heure d’été d’Europe centrale) {}

dusk: Mon Sep 02 2019 21:07:08 GMT+0200 (heure d’été d’Europe centrale) {}

night: Mon Sep 02 2019 22:29:55 GMT+0200 (heure d’été d’Europe centrale) {}
nightEnd: Mon Sep 02 2019 05:14:01 GMT+0200 (heure d’été d’Europe centrale) {}

goldenHour: Mon Sep 02 2019 19:52:16 GMT+0200 (heure d’été d’Europe centrale)
goldenHourEnd: Mon Sep 02 2019 07:51:41 GMT+0200 (heure d’été d’Europe centrale)
nadir: Mon Sep 02 2019 01:51:58 GMT+0200 (heure d’été d’Europe centrale)
nauticalDawn: Mon Sep 02 2019 05:57:02 GMT+0200 (heure d’été d’Europe centrale) {}
nauticalDusk: Mon Sep 02 2019 21:46:55 GMT+0200 (heure d’été d’Europe centrale) {}
 */
import moment from "moment"
import SunCalc from "suncalc"

const PANTHEON_POSITION = {
  latitude: 48.84605,
  longitude: 2.34515,
}

const correctNightBounds = (night, nightEnd, now) => {
  const momentNight = moment(night)
  const momentNightEnd = moment(nightEnd)
  if (now.hour() > 12) {
    momentNightEnd.add(1, "days")
    return [momentNight, momentNightEnd]
  }

  if (momentNight.isSameOrAfter(now, "day")) {
    momentNight.subtract(1, "days")
  } else if (momentNightEnd.isBefore(now, "day")) {
    momentNightEnd.add(1, "days")
  }
  return [momentNight, momentNightEnd]
}

const getTimes = now => {
  const times = SunCalc.getTimes(
    now.toDate(),
    PANTHEON_POSITION.latitude,
    PANTHEON_POSITION.longitude
  )

  const dawn = moment(times.dawn)
  const solarNoon = moment(times.solarNoon)
  const dusk = moment(times.dusk)
  console.log("nowHour", now.hour())
  const [night, nightEnd] = correctNightBounds(times.night, times.nightEnd, now)
  console.log(times)
  console.log("now", now.toString())
  return {
    dawn,
    solarNoon,
    dusk,
    night,
    nightEnd: nightEnd,
    sunrise: moment(times.sunrise),
    sunset: moment(times.sunset),
  }
}
export const times = now => {
  const times = getTimes(now)
  const isDawn = now.isBetween(times.dawn, times.solarNoon) //is dawn => now >= dawn && now <= sunriseEnd
  const isSunNoon = now.isAfter(times.solarNoon) && now.isBefore(times.dusk) //is sunNoon => now > sunriseEnd && now < dusk <= default
  const isDusk = now.isBetween(times.dusk, times.night)
  const isNight = now.isAfter(times.night)

  console.log(`isDawn: ${isDawn}`)
  console.log(`isSunNoon: ${isSunNoon}`)
  console.log(`isDusk: ${isDawn}`)
  console.log(`isNight: ${isNight}`)

  if (isDawn) return "DAWN"
  else if (isSunNoon) return "SUN"
  else if (isDusk) return "DUSK"
  else if (isNight) return "NIGHT"
  else return "NIGHT"
}

const getDegree = pos => {
  //: SunCalc.getMoonPosition(/*Date*/ now.toDate(), /*Number*/ 48.84605, /*Number*/  2.34515)
  var sunAzimuth = (pos.azimuth * 180) / Math.PI
  var sunAltitude = (pos.altitude * 180) / Math.PI
  console.log(`azimuth: ${sunAzimuth}`)
  console.log(`altitude: ${sunAltitude}`)

  var degree = 0.0
  Math.asin

  if (sunAzimuth >= 0) {
    degree = Math.abs(360 - sunAltitude) - 80
  } else {
    degree = sunAltitude + 200
  }
  console.log(`degree: ${degree}`)
  return degree
}

const getPercent = (timeStart, timeEnd, timeBetween) => {
  console.log("timeEnd", timeEnd.toString())
  console.log("timeStart", timeStart.toString())
  console.log("timeBetween", timeBetween.toString())
  const totalDuration = timeEnd.diff(timeStart)
  const passedDuration = timeBetween.diff(timeStart)
  console.log("totalDuration", totalDuration)
  console.log("passedDuration", passedDuration)
  let percent = passedDuration / totalDuration
  if (percent < 0) {
    percent = 0
  } else if (percent > 1) {
    percent = 1
  }
  return percent
}

const ELLIPSE_START_DEGREE = 180
const ELLIPSE_PEAK_DEGREE = 270

export const solarDegree = now => {
  const times = getTimes(now)
  if (now.isBefore(times.solarNoon)) {
    const percent = getPercent(times.sunrise, times.solarNoon, now)
    console.log("percent", percent)
    return percent * 90 + ELLIPSE_START_DEGREE
  }
  const percent = getPercent(times.solarNoon, times.sunset, now)
  console.log("percent", percent)
  return percent * 90 + ELLIPSE_PEAK_DEGREE
}

/**
 * Moon image is particular (with blanks in upper left and lower right corners)
 * so wee need to do some corrections for the moon to be visible in edge positions
 */
const MOON_DEGREE_UPPER_LIMIT = 345

export const moonDegree = now => {
  const times = getTimes(now)
  let percent = getPercent(times.night, times.nightEnd, now)
  console.log("percent", percent)
  let result = percent * 180 + ELLIPSE_START_DEGREE
  if (result > MOON_DEGREE_UPPER_LIMIT) {
    result = MOON_DEGREE_UPPER_LIMIT
  }
  return result
}
