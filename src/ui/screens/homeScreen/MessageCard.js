import React from 'react'
import { useSelector } from 'react-redux'
import {
  Body,
  Card,
  CardItem,
  View,
  Text,
  H1,
  H2,
  H3,
  Left,
  Right,
} from 'native-base'
import { MessageSelectors } from 'src/store/message'
import { subjects, moments, reccurences } from 'src/utils'
import moment from 'moment'
import momentFR from 'moment/locale/fr'

const BOLD = text => <Text style={{ fontWeight: 'bold' }}>{text}</Text>
const BR = <Text>{'\n'}</Text>

export default ({ message, me }) => {
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
  var fr = moment().locale('fr', momentFR)
  const { activite, reccurence, moment_time } = message
  const moment_id = message.moment
  const { username } = me

  const styles = {
    datetime: {
      fontSize: 20,
      color: '#777',
      marginBottom: 16,
      fontWeight: '700',
    },
    text: {
      fontSize: 24,
      fontWeight: '700',
      color: '#555',
      marginBottom: 16,
    },
  }
  const moment_value = (moments[moment_id] && moments[moment_id].value) || ''
  const reccurence_value =
    (reccurences[reccurence] && reccurences[reccurence].value) || ''
  const day = fr.format('dddd Do MMMM YYYY')
  const hour = fr.format('HH:mm')
  const text = `\n${day}, ${hour}`
  const now = moment()
  const formattedMomentTime = moment_time && moment_time.substr(0, 5)
  return (
    <View style={{ marginTop: 24 }}>
      <Text
        style={{
          color: 'rgba(255,255,255,0.7)',
          fontWeight: 'bold',
          fontSize: 16,
          textAlign: 'right',
          lineHeight: 30,
        }}
      >
        {diffusionDate.isBefore(now) ? 'Dernier' : 'Prochain'} rappel:{' '}
        {diffusionDate.format('LLL')}
      </Text>
      <Card style={{ margin: 0, padding: 0 }}>
        <CardItem body style={{ margin: 0, padding: 0, width: '100%' }}>
          <View style={{ flexDirection: 'column', width: '100%' }}>
            <Text style={styles.datetime}>{text}</Text>
            <Text style={styles.text}>
              {`Penser à  ${activite} ${reccurence_value} ${moment_value} ${formattedMomentTime}`}
            </Text>
          </View>
        </CardItem>
      </Card>
    </View>
  )
}
