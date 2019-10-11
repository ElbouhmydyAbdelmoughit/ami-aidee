

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
import moment from 'moment'

 export const times = (now) => {
  var SunCalc = require('suncalc')
 
  const times = SunCalc.getTimes(now.toDate(), 48.84605, 2.34515)
 
  console.log(times)
  const dawn = moment(times.dawn)
  const solarNoon = moment(times.solarNoon)
  const dusk = moment(times.dusk)
  const night = moment(times.night)
  const nightEnd = moment(times.nightEnd).add(1, 'days')

  console.log(nightEnd.format())
  const isDawn = now.isBetween(dawn, solarNoon)  //is dawn => now >= dawn && now <= sunriseEnd
  const isSunNoon = now.isAfter(solarNoon) && now.isBefore(dusk) //is sunNoon => now > sunriseEnd && now < dusk <= default
  const isDusk = now.isBetween(dusk, night)
  const isNight = now.isAfter(night)
  //is dusk => now >= dusk && now < night
//is night => now >= night && now <= nightEnd

  console.log(`isDanw: ${isDawn}`)
  console.log(`isSunNoon: ${isSunNoon}`)
  console.log(`isDusk: ${isDawn}`)
  console.log(`isNight: ${isDawn}`)
  
  if (isDawn) return "DAWN"
  else if (isSunNoon) return "SUN"
  else if (isDusk) return "DUSK"
  else if (isNight) return "NIGHT"
  else return "NIGHT"
 }

export const solarDegree = (now) => {
  var SunCalc = require('suncalc');
  const t = times(now)
  const sunPos = //t != "NIGHT" ? 
  SunCalc.getPosition(/*Date*/ now.toDate(), /*Number*/ 48.84605, /*Number*/  2.34515) 
  //: SunCalc.getMoonPosition(/*Date*/ now.toDate(), /*Number*/ 48.84605, /*Number*/  2.34515)
  var sunAzimuth = sunPos.azimuth * 180 / Math.PI;
  var sunAltitude = sunPos.altitude * 180 / Math.PI;

  console.log(sunPos)
  console.log(`Sun.azimuth: ${sunAzimuth}`)
  console.log(`Sun.altitude: ${sunAltitude}`)

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

export const moonDegree = (now) => {
  var SunCalc = require('suncalc');
  const t = times(now)
  const sunPos = //t != "NIGHT" ? 
  SunCalc.getMoonPosition(/*Date*/ now.toDate(), /*Number*/ 48.84605, /*Number*/  2.34515) 
  //: SunCalc.getMoonPosition(/*Date*/ now.toDate(), /*Number*/ 48.84605, /*Number*/  2.34515)
  var sunAzimuth = sunPos.azimuth * 180 / Math.PI;
  var sunAltitude = sunPos.altitude * 180 / Math.PI;

  console.log(sunPos)
  console.log(`Sun.azimuth: ${sunAzimuth}`)
  console.log(`Sun.altitude: ${sunAltitude}`)

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
