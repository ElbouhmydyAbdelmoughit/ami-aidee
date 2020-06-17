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
import { MessageSelectors } from 'src/redux/message'
import { subjects, moments, reccurences } from 'src/utils'
import Icon from 'react-native-vector-icons/MaterialIcons'
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
  const { activite, reccurence, location, moment_time } = message
  const moment_id = message.moment
  const { username } = me

  const styles = {
    text: {
      fontSize: 24,
      fontWeight: '700',
      color: '#555',
      marginBottom: 16,
    },
    secondaryInfo: {
      fontSize: 20,
      fontWeight: '500',
      color: '#777',
      marginBottom: 16,
    },
  }
  const moment_value = (moments[moment_id] && moments[moment_id].value) || ''
  const reccurence_value =
    (reccurences[reccurence] && reccurences[reccurence].value) || ''
  const day = fr.format('dddd Do MMMM YYYY')
  const hour = fr.format('HH:mm')
  const text = `\nNous sommes le ${day} il est ${hour}.`
  const now = moment()
  return (
    <View>
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
      <Card style={{ flex: 1 }}>
        <CardItem body style={{ width: '100%' }}>
          <View style={{ flexDirection: 'column', width: '100%' }}>
            <Text style={styles.text}>{text}</Text>
            <Text style={styles.text}>
              {`Penser à  ${activite} ${reccurence_value} ${moment_value} ${moment_time}`}
            </Text>
            {location ? (
              <View style={{ flexDirection: 'row', marginTop: 8 }}>
                <Icon
                  name={'location-on'}
                  size={24}
                  color={'#999'}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.secondaryInfo}>{location}</Text>
              </View>
            ) : null}
          </View>
        </CardItem>
      </Card>
    </View>
  )
}
