import { NativeModules } from 'react-native';
import { subjects, moments, reccurences } from 'src/utils'

import moment from 'moment'

export const Notifier = NativeModules.Notifier;

export const notifierAuthorization = () => {
  Notifier.authorization()
}

export const notifierAdd = ({title, body, date}) => {
  return Notifier.addNotification({
    title: title,
    body: body
  }, date /*  fr.add(2, 'm').toDate().getTime() */)
}

export const notifierAddMessage = (message) => {
  const { activite, diffusion_end_date, diffusion_start_date, moment, moment_time, location, subject, reccurence } = message
  
  //const recc = moments[moment]
  switch (reccurence) {
    case 2: // une fois par semaine
    /*
    moment().add('weeks', 1)
    moment().below(date) ?
    date = moment(diffusion_start_date)
    end = moment(diffusion_end_date)
      for date = diffus_start_date; date < diffus_end_date; date += 1 semaine
        notifierAdd()
    */
    break 
    case 3: // tous les jours
    /*
    moment().add('days', 1)
      for date = diffus_start_date; date < diffus_end_date; date += 1 jour
        notifierAdd()
    */
    break 
    case 4: // une fois par mois
    /*
    moment().add('months', 1)
      for date = diffus_start_date; date < diffus_end_date; date += 1 mois
        notifierAdd()
    */
    break 

    default: break
  }

  notifierAdd({
    title: subjects[subject],
    body: activite,
    date: moment_time
  })
}

export const notifierAddMany = (messages) => {
  messages.forEach( (message) => {
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