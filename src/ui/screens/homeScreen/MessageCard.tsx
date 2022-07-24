import React from 'react'
import { useSelector } from 'react-redux'
import { Text } from 'native-base'
import { View } from 'react-native'
import { MessageSelectors } from 'store/message'
import { getSubjects, getMoments, getRecurrences } from 'utils'
import moment from 'core/moment'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ZoomableImage from './ZoomableImage'
import { Message } from 'core/types'
import { useTranslation } from 'react-i18next'

const BOLD = text => <Text style={{ fontWeight: 'bold' }}>{text}</Text>
const BR = <Text>{'\n'}</Text>

const getSubject = (message: Message) => {
  console.log('message subjet', message.subjet)
  const subjects = getSubjects()
  let index
  try {
    index = Number.parseInt(message.subjet)
  } catch (e) {
    return message.subjet
  }
  return subjects[index] ? subjects[index].value : message.subjet
}

const MessageCard = ({ message, me, uri, zooming, onZoom, onUnzoom }) => {
  /*
activite: "prendre un doliprane"
auxiliary: {id: 2, firstname: "aidant", lastname: "super", __typename: "auxiliaries"}
created_at: null
diffusion_end_date: "2019-09-10T00:00:00"
diffusion_start_date: "2019-08-18T00:00:00"
id: 1
location: "chez toi"
moment: "1"
moment_time: "17:04:00"
picture_url: ""
reccurence: null
subjet: "1"
updated_at: null
video_url: ""
*/
  const diffusionDate = useSelector(
    MessageSelectors.getMessageNextDiffusionDate(message)
  )
  const { activite, reccurence, moment_time, location } = message
  const moment_id = message.moment
  const { username } = me

  const styles = {
    datetime: {
      fontSize: 12,
      color: '#eee',
      marginBottom: 16,
      fontWeight: '700',
    },
    title: {
      fontSize: 32,
      lineHeight: 46,
      fontWeight: 'bold',
      marginBottom: 8,
      color: 'white',
    },
    text: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: '500',
      color: 'white',
      marginBottom: 16,
    },
    secondaryInfo: {
      fontSize: 20,
      fontWeight: '700',
      color: 'rgba(255,255,255,0.6)',
      marginBottom: 16,
    },
  }
  const moments = getMoments()
  const moment_value = (moments[moment_id] && moments[moment_id].value) || ''
  const reccurences = getRecurrences()
  const reccurence_value =
    (reccurences[reccurence] && reccurences[reccurence].value) || ''
  const day = moment().format('dddd Do MMMM YYYY')
  const hour = moment().format('HH:mm')
  const text = `\n${day}, ${hour}`
  const now = moment()
  const formattedMomentTime = moment_time && moment_time.substr(0, 5)
  const { t } = useTranslation()
  return (
    <View style={{ marginTop: 24, width: '100%', flex: 1 }}>
      <Text
        style={{
          color: '#eee',
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'right',
          lineHeight: 30,
        }}
      >
        {diffusionDate.isBefore(now)
          ? t('screen.reminders_list.last_reminder', 'Dernier rappel :')
          : t('screen.reminders_list.next_reminder', 'Prochain rappel :')}{' '}
        {diffusionDate.format('LLL')}
      </Text>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.3)',
          width: '100%',
          marginRight: 16,
          borderRadius: 16,
          flex: 1,
        }}
      >
        <View style={{ flexDirection: 'column', paddingHorizontal: 16 }}>
          <Text style={styles.datetime}>{text}</Text>
          <Text style={styles.title}>{getSubject(message)}</Text>
          <Text style={styles.text}>
            {t('screen.reminders_list.reminder_message', {
              defaultValue: 'Penser à {{activity}} {{recurrence}} {{datetime}}',
              activity: activite,
              recurrence:
                reccurences[reccurence] && reccurences[reccurence].label,
              datetime: `${moment_value} ${formattedMomentTime}`,
            })}
          </Text>
        </View>
        {location ? (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 8,
              alignSelf: 'flex-start',
              paddingHorizontal: 16,
            }}
          >
            <Icon
              name={'location-on'}
              size={24}
              color={'rgba(255,255,255,0.6)'}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.secondaryInfo}>{location}</Text>
          </View>
        ) : null}
        <ZoomableImage
          uri={uri}
          zooming={zooming}
          onZoom={onZoom}
          key={uri}
          onUnzoom={onUnzoom}
        />
      </View>
    </View>
  )
}

export default MessageCard
