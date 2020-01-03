import moment from 'moment'


const DELAY_BEFORE_NOTIFICATION_IN_MINUTES = 15;

const getDateStrFromMessage = (message) => {
  return `${message.diffusion_start_date.split('T')[0]}T${message.moment_time}`;
}
export const getClosestFutureDate = (dates) => {
  if (dates.length === 0) {
      return null;
  }

  let minDiff = 0;
  for (const date of dates) {
      minDiff += minDiff + 30;
      var currentDate = moment(date);
      if (currentDate.isAfter(moment()) && currentDate.diff(moment(), "days") <= minDiff) {
          break;
      }
  }
  return currentDate;
};

export const closestMessage = (messages) => {
  const now = moment()

  //let closest = Infinity;
  let dates = messages.map(getDateStrFromMessage)

  let date = getClosestFutureDate(dates);
  console.log(date)
  let index = dates.indexOf(date.format("YYYY-MM-DDTHH:mm:ss"))
  console.log(index)
  return messages[index]
}

export const messageToNotify = (messages) => {
  let result;
  if (messages) {
    console.log('messageToNotify', messages)
    const messagesList = Object.values(messages);
    const now = moment()
    const momentOfActivity = moment().add(DELAY_BEFORE_NOTIFICATION_IN_MINUTES, 'minutes')
    result = messagesList.find((message => {
      const date = moment(getDateStrFromMessage(message));
      console.log(date.toString(), now.toString(), momentOfActivity.toString(), date.isAfter(now), date.isBefore(momentOfActivity));
      return date.isAfter(now) && date.isBefore(momentOfActivity);
    }))
  }
  console.log('messageToNotify', result)
  return result
}

export const sortMessage = (a, b) => {
  //2019-10-10T00:00:00
  const aStr = `${a.diffusion_start_date.split('T')[0]}T${a.moment_time}`
  const bStr = `${b.diffusion_start_date.split('T')[0]}T${b.moment_time}`
  const aDate = moment(aStr)
  const bDate = moment(bStr)
  return aDate.unix() - bDate.unix()
}