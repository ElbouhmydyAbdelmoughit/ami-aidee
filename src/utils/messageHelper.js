import moment from 'moment'

const getDateStrFromMessage = message => {
  return `${message.diffusion_start_date.split('T')[0]}T${message.moment_time}`
}
export const getClosestFutureDate = dates => {
  if (dates.length === 0) {
    return null
  }

  let minDiff = 0
  for (const date of dates) {
    minDiff += minDiff + 30
    var currentDate = moment(date)
    if (
      currentDate.isAfter(moment()) &&
      currentDate.diff(moment(), 'days') <= minDiff
    ) {
      break
    }
  }
  return currentDate
}

const DEFAULT_PREDIFFUSION_BEFORE_IN_MIN = 15
export const messageToAlert = (messages, alerted, minuteTick) => {
  if (!messages) {
    return undefined
  }
  const messagesList = Object.values(messages)
  const now = minuteTick.second(0)
  const result = messagesList.find(message => {
    const messageDate = moment(getDateStrFromMessage(message))
    const difference = messageDate.diff(now, 'minutes')
    const prediffusionBefore =
      message.prediffusion_before_mn || DEFAULT_PREDIFFUSION_BEFORE_IN_MIN
    return (
      difference > 0 &&
      difference <= prediffusionBefore &&
      (!alerted || alerted.indexOf(message.id) === -1)
    )
  })

  return result
}

const isSameMinute = (moment1, moment2) => {
  return (
    moment1.isSame(moment2, 'days') &&
    moment1.hour() === moment2.hour() &&
    moment1.minute() === moment2.minute()
  )
}
export const immediateMessage = (messages, alerted, minuteTick) => {
  if (!messages) {
    return undefined
  }
  const messagesList = Object.values(messages)
  const now = minuteTick.second(0)
  const result = messagesList.find(message => {
    const messageDate = moment(getDateStrFromMessage(message))
    return (
      isSameMinute(messageDate, now) &&
      (!alerted || alerted.indexOf(message.id) === -1)
    )
  })

  return result
}

export const closestMessage = messages => {
  const dates = messages.map(getDateStrFromMessage)

  const date = getClosestFutureDate(dates)
  const index = dates.indexOf(date.format('YYYY-MM-DDTHH:mm:ss'))
  return messages[index]
}

export const sortMessage = (a, b) => {
  //2019-10-10T00:00:00
  const aStr = `${a.diffusion_start_date.split('T')[0]}T${a.moment_time}`
  const bStr = `${b.diffusion_start_date.split('T')[0]}T${b.moment_time}`
  const aDate = moment(aStr)
  const bDate = moment(bStr)
  return aDate.unix() - bDate.unix()
}
