import moment from "moment"

const getDateStrFromMessage = message => {
  return `${message.diffusion_start_date.split("T")[0]}T${message.moment_time}`
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
      currentDate.diff(moment(), "days") <= minDiff
    ) {
      break
    }
  }
  return currentDate
}

export const closestMessage = messages => {
  const now = moment()

  //let closest = Infinity;
  let dates = messages.map(getDateStrFromMessage)

  let date = getClosestFutureDate(dates)
  console.log(date)
  let index = dates.indexOf(date.format("YYYY-MM-DDTHH:mm:ss"))
  console.log(index)
  return messages[index]
}

/**
 * Duration before message time where user should be alerted
 */
const REMINDER_DELAY_IN_MINUTES = 15
export const messageToAlert = (messages, alerted, minuteTick) => {
  if (!messages) {
    return undefined
  }
  const messagesList = Object.values(messages)
  const now = minuteTick.second(0)
  const result = messagesList.find(message => {
    const messageDate = moment(getDateStrFromMessage(message))
    const difference = messageDate.diff(now, "minutes")
    return (
      difference === REMINDER_DELAY_IN_MINUTES &&
      (!alerted || alerted.indexOf(message.id) === -1)
    )
  })

  console.log("messageToAlert", result)
  return result
}

const isSameMinute = (moment1, moment2) => {
  return (
    moment1.isSame(moment2, "days") &&
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

  console.log("immediate message", result)
  return result
}

export const sortMessage = (a, b) => {
  //2019-10-10T00:00:00
  const aStr = `${a.diffusion_start_date.split("T")[0]}T${a.moment_time}`
  const bStr = `${b.diffusion_start_date.split("T")[0]}T${b.moment_time}`
  const aDate = moment(aStr)
  const bDate = moment(bStr)
  return aDate.unix() - bDate.unix()
}
