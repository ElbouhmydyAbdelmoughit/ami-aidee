import { NativeModules } from 'react-native'
import { getSubjects } from 'utils'

export const { Notifier } = NativeModules

export const notifierAuthorization = () => {
  Notifier.authorization()
}

export const notifierAdd = ({ title, body, date }) => {
  return Notifier.addNotification(
    {
      title,
      body,
    },
    date /*  fr.add(2, 'm').toDate().getTime() */
  )
}

export const notifierAddMessage = message => {
  notifierAuthorization()
  const {
    activite,
    // diffusion_end_date,
    diffusion_start_date,
    moment,
    moment_time,
    // location,
    subject,
    // reccurence,
  } = message

  const aStr = `${diffusion_start_date.split('T')[0]}T${moment_time}`
  console.log(`notify ${aStr}`)
  const subjects = getSubjects()
  const aDate = moment(aStr)
  notifierAdd({
    title: subjects[subject],
    body: activite,
    date: aDate.toDate().getTime(),
  })
}

export const notifierAddMany = messages => {
  messages.forEach(message => {
    notifierAddMessage(message)
  })
  /**

activite: "Prendre votre tahor"
auxiliary: {id: 2, firstname: "aidant", lastname: "super", __typename: "auxiliaries"}
created_at: null
diffusion_end_date: "2023-12-02T00:00:00"
diffusion_start_date: "2019-08-01T00:00:00"
id: 37
location: "pendant les repas"
moment: "0"
moment_time: "12:05:00"
picture_url: "tahor.jpeg"
reccurence: null
subjet: "1"
updated_at: null
video_url: "testounet.mp4"

 */
  console.log(messages)
}
