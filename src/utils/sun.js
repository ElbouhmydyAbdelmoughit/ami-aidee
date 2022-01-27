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
import moment from 'core/moment'
import SunCalc from 'suncalc'

const PANTHEON_POSITION = {
  latitude: 48.84605,
  longitude: 2.34515,
}

const correctNightBounds = (night, nightEnd, solarNoon, now) => {
  const momentNight = moment(night)
  const momentNightEnd = moment(nightEnd)
  if (now.isAfter(solarNoon)) {
    momentNightEnd.add(1, 'days')
    return [momentNight, momentNightEnd]
  }

  momentNight.subtract(1, 'days')
  return [momentNight, momentNightEnd]
}

const hasUserCustomizedTimes = helpedUser => {
  return (
    helpedUser &&
    helpedUser.bedtime_hour &&
    helpedUser.waking_hour &&
    helpedUser.sun_culmination_hour
  )
}

const concatDateAndTime = (date, time) => {
  return moment(`${date.format('YYYY-MM-DDTHH:mm:ss').split('T')[0]}T${time}`)
}

const getTimes = (now, helpedUser) => {
  if (hasUserCustomizedTimes(helpedUser)) {
    const today = moment()
    const bedtimeHour = concatDateAndTime(today, helpedUser.bedtime_hour)
    const wakingHour = concatDateAndTime(today, helpedUser.waking_hour)
    const sunCulminationHour = concatDateAndTime(
      today,
      helpedUser.sun_culmination_hour
    )
    const [night, nightEnd] = correctNightBounds(
      bedtimeHour,
      wakingHour,
      sunCulminationHour,
      now
    )
    return {
      dawn: nightEnd,
      solarNoon: sunCulminationHour,
      dusk: night,
      night,
      nightEnd,
      sunrise: nightEnd,
      sunset: night,
    }
  }
  const suncalcTimes = SunCalc.getTimes(
    now.toDate(),
    PANTHEON_POSITION.latitude,
    PANTHEON_POSITION.longitude
  )
  const [night, nightEnd] = correctNightBounds(
    suncalcTimes.night,
    suncalcTimes.nightEnd,
    suncalcTimes.solarNoon,
    now
  )
  return {
    dawn: moment(suncalcTimes.dawn),
    solarNoon: moment(suncalcTimes.solarNoon),
    dusk: moment(suncalcTimes.dusk),
    night,
    nightEnd,

    sunrise: moment(suncalcTimes.sunrise),
    sunset: moment(suncalcTimes.sunset),
  }
}
export const times = (now, helpedUser) => {
  const computedTimes = getTimes(now, helpedUser)
  const isDawn = now.isBetween(computedTimes.dawn, computedTimes.solarNoon) //is dawn => now >= dawn && now <= sunriseEnd
  const isSunNoon =
    now.isAfter(computedTimes.solarNoon) && now.isBefore(computedTimes.dusk) //is sunNoon => now > sunriseEnd && now < dusk <= default
  const isDusk = now.isBetween(computedTimes.dusk, computedTimes.night)
  const isNight = now.isAfter(computedTimes.night)

  if (isDawn) return 'DAWN'
  if (isSunNoon) return 'SUN'
  if (isDusk) return 'DUSK'
  if (isNight) return 'NIGHT'
  return 'NIGHT'
}

const getDegree = pos => {
  //: SunCalc.getMoonPosition(/*Date*/ now.toDate(), /*Number*/ 48.84605, /*Number*/  2.34515)
  var sunAzimuth = (pos.azimuth * 180) / Math.PI
  var sunAltitude = (pos.altitude * 180) / Math.PI

  var degree = 0.0
  Math.asin

  if (sunAzimuth >= 0) {
    degree = Math.abs(360 - sunAltitude) - 80
  } else {
    degree = sunAltitude + 200
  }
  return degree
}

const getPercent = (timeStart, timeEnd, timeBetween) => {
  const totalDuration = timeEnd.diff(timeStart)
  const passedDuration = timeBetween.diff(timeStart)
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

export const solarDegree = (now, helpedUser) => {
  const computedTimes = getTimes(now, helpedUser)
  if (now.isBefore(computedTimes.solarNoon)) {
    const percent = getPercent(
      computedTimes.sunrise,
      computedTimes.solarNoon,
      now
    )
    return percent * 90 + ELLIPSE_START_DEGREE
  }
  const percent = getPercent(computedTimes.solarNoon, computedTimes.sunset, now)
  return percent * 90 + ELLIPSE_PEAK_DEGREE
}

/**
 * Moon image is particular (with blanks in upper left and lower right corners)
 * so wee need to do some corrections for the moon to be visible in edge positions
 */
const MOON_DEGREE_UPPER_LIMIT = 345

export const moonDegree = (now, helpedUser) => {
  const computedTimes = getTimes(now, helpedUser)
  const percent = getPercent(computedTimes.night, computedTimes.nightEnd, now)
  let result = percent * 180 + ELLIPSE_START_DEGREE
  if (result > MOON_DEGREE_UPPER_LIMIT) {
    result = MOON_DEGREE_UPPER_LIMIT
  }
  return result
}
