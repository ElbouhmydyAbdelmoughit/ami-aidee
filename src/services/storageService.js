// @flow

import { AsyncStorage, Platform } from 'react-native'
import UUIDGenerator from 'react-native-uuid-generator'

export async function Get_Reminder_Service() {
  const reminders = await AsyncStorage.getItem('reminders')
  let list = JSON.parse(reminders)
  console.log(list)
  if (!list) {
    list = []
  }
  return {
    result: 'ok',
    data: list,
  }
}

export async function Save_Reminder_Service(reminder) {
  const values = reminder
  console.log('Save_Reminder_Service')
  console.log(values)
  const uuid = await UUIDGenerator.getRandomUUID()
  const RNFS = require('react-native-fs')
  const reminders = await AsyncStorage.getItem('reminders')
  let reminderList = JSON.parse(reminders)
  if (!reminderList) {
    reminderList = []
  }

  console.log(reminderList)
  try {
    const imgPath = `${RNFS.DocumentDirectoryPath}/img_${uuid}.png`
    const videoPath = `${RNFS.DocumentDirectoryPath}/video_${uuid}.mp4`
    // write the file
    if (
      values.imageURL != null &&
      values.imageURL != undefined &&
      values.imageURL != ''
    ) {
      console.log('write image file')
      // const data = await RNFS.readFile(values.imageURL, 'ascii')
      await RNFS.copyFile(values.imageURL, imgPath)
      // await RNFS.writeFile(imgPath, data, 'ascii')
    }

    // write video file
    // const videoData = await RNFS.readFile(values.videoUri, 'ascii')
    // await RNFS.writeFile(videoPath, videoData, 'ascii')
    if (
      values.videoUri != null &&
      values.videoUri != undefined &&
      values.videoUri != ''
    ) {
      await RNFS.copyFile(values.videoUri, videoPath)
    }

    // Maybe only if android
    values.imageURL = Platform.OS === 'android' ? `file://${imgPath}` : imgPath //
    values.videoUri =
      Platform.OS === 'android' ? `file://${videoPath}` : videoPath //

    if (values.id != null || values.id != undefined) {
      // TODO: replace
      console.log('replace')
      let index = -1
      for (let i = 0; i < reminderList.length && index == -1; ++i) {
        const v = reminderList[i]
        console.log('searching...')
        console.log(v)
        if (v.id == values.id) {
          console.log('found id')
          index = i
          continue
        }
      }
      console.log(`replace at index: ${index}`)
      reminderList[index] = values
    } else {
      values.id = uuid
      reminderList.push(values)
    }
    console.log(reminderList)
    await AsyncStorage.setItem('reminders', JSON.stringify(reminderList))
    return {
      result: 'ok',
    }
  } catch (error) {
    // Error saving data
    console.log('azertyui')
    console.log(error)
    return {
      result: 'error',
      message: 'Saving reminder failure.',
    }
  }
}
