import React from 'react';

import { Body, Card, CardItem, View, Text, H1, H2, H3, Left, Right  } from 'native-base';

import { subjects, moments, reccurences } from 'src/utils'
import moment from 'moment'
import momentFR from 'moment/locale/fr' 

const BOLD = (text) => (<Text style={{fontWeight: 'bold'}}>{text}</Text>)
const BR = (<Text>{'\n'}</Text>)

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

  var fr = moment().locale("fr", momentFR)
  const { activite, reccurence, location, moment_time } = message
  const moment_id = message.moment
  const { username } = me

  const moment_value = moments[moment_id] && moments[moment_id].value || ""
  const reccurence_value = reccurences[reccurence] && reccurences[reccurence].value || ""
  const day = fr.format("dddd, MMMM Do YYYY")
  const hour = fr.format("hh:mm")
  const text = `\nBonjour ${username}, \n\nnous sommes le ${day} il est ${hour}.\n\nPenser à  ${activite} ${reccurence_value} ${moment_value} ${moment_time}, ${location}`

  return (
    <Card style={{ flex: 1 }}>
      <CardItem header style={styles.header}>
        <H2 style={styles.title}>Message</H2>
      </CardItem>
      <CardItem body>
        <H2>{text}</H2>
      </CardItem>
    </Card>
  )
}


/**
 * Styles
 */
const styles = {

  header: {
    justifyContent: 'center',
    alignSelf: 'center'
  },

  title: {
    alginSelf: 'center',
    fontWeight: 'bold'
  }
}