import moment from 'moment'

const getNextDiffusionDate = (message, now) => {
  const diffusionStartDate = moment(message.diffusion_start_date)
  const isStartDateTodayOrAfter = diffusionStartDate.isSameOrAfter(now, 'day')

  const todayDiffusion = moment(
    `${now.format('YYYY-MM-DD')}T${message.moment_time}`
  )
  switch (message.reccurence) {
    case '0':
    case '1': {
      return diffusionStartDate
    }
    case '2': {
      // une fois par semaine
      if (isStartDateTodayOrAfter) {
        return diffusionStartDate
      }
      const weeksToAdd = now.isAfter(todayDiffusion)
        ? Math.ceil(now.diff(diffusionStartDate, 'week', true))
        : 0
      return diffusionStartDate.add(weeksToAdd, 'week')
    }
    case '3': {
      // tous les jours
      if (isStartDateTodayOrAfter) {
        return diffusionStartDate
      }
      const dayToAdd = now.isAfter(todayDiffusion) ? 1 : 0

      return moment(now).add(dayToAdd, 'day')
    }
    case '4': {
      // une fois par mois
      if (isStartDateTodayOrAfter) {
        return diffusionStartDate
      }
      const monthsToAdd = Math.ceil(now.diff(diffusionStartDate, 'month', true))
      return diffusionStartDate.add(monthsToAdd, 'month')
    }
    default:
      return diffusionStartDate
  }
}

export const getMessageNextDiffusionDatetime = (message, now) => {
  return moment(
    `${getNextDiffusionDate(message, now).format('YYYY-MM-DD')}T${
      message.moment_time
    }`
  )
}

const isSameMinute = (moment1, moment2) => {
  return (
    moment1.isSame(moment2, 'days') &&
    moment1.hour() === moment2.hour() &&
    moment1.minute() === moment2.minute()
  )
}

const DEFAULT_PREDIFFUSION_BEFORE_IN_MIN = 15
export const messageToAlert = (messages, alerted, minuteTick) => {
  if (!messages) {
    return undefined
  }
  const now = minuteTick.second(0)
  const messagesList = Object.values(messages)
  const result = messagesList.find(message => {
    const messageDate = getMessageNextDiffusionDatetime(message, now)
    const prediffusionDate = getMessageNextDiffusionDatetime(
      message,
      now
    ).subtract(
      message.prediffusion_before_mn || DEFAULT_PREDIFFUSION_BEFORE_IN_MIN,
      'minutes'
    )
    return (
      now.isSameOrAfter(prediffusionDate) &&
      now.isBefore(messageDate) &&
      (!alerted || alerted.indexOf(message.id) === -1)
    )
  })

  return result
}

export const immediateMessage = (messages, alerted, minuteTick) => {
  if (!messages) {
    return undefined
  }
  const messagesList = Object.values(messages)
  const now = minuteTick.second(0)
  const result = messagesList.find(message => {
    const messageDate = getMessageNextDiffusionDatetime(message, now)
    return (
      isSameMinute(messageDate, now) &&
      (!alerted || alerted.indexOf(message.id) === -1)
    )
  })

  return result
}

export const sortMessage = now => (a, b) => {
  const aDiffusionDate = getMessageNextDiffusionDatetime(a, now)
  const bDiffusionDate = getMessageNextDiffusionDatetime(b, now)
  if (aDiffusionDate.isAfter(bDiffusionDate)) {
    return 1
  }
  return -1
}

const findArrayMinIndex = array => {
  return array.reduce((acc, cur, curIndex) => {
    if (cur > 0 && array[acc] < 0) {
      return curIndex
    }
    if (cur < 0 && array[acc] > 0) {
      return acc
    }
    if (Math.abs(cur) < Math.abs(array[acc])) {
      return curIndex
    }
    return acc
  }, 0)
}
export const closestMessage = (messages, now) => {
  if (messages.length === 0) {
    return undefined
  }
  const closestFutureDateIndex = findArrayMinIndex(
    messages
      .map(message => getMessageNextDiffusionDatetime(message, now))
      .map(diffusionDate => diffusionDate.diff(now, 'seconds'))
  )
  return messages[closestFutureDateIndex]
}
