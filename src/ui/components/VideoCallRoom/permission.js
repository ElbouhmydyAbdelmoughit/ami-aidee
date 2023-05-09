import { PermissionsAndroid } from 'react-native'

const requestAudioPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
  )
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log('You can use the mic')
  } else {
    console.log('Permission denied')
    throw new Error('permission_denied')
  }
}
/**
 * @name requestCameraAndAudioPermission
 * @description Function to request permission for Audio and Camera
 */
export default async function requestCameraAndAudioPermission() {
  const granted = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.CAMERA,
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  ])
  if (
    granted['android.permission.RECORD_AUDIO'] ===
      PermissionsAndroid.RESULTS.GRANTED &&
    granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED
  ) {
    console.log('You can use the cameras & mic')
  } else {
    console.log('Permission denied')

    throw new Error('permission_denied')
  }
}

export { requestAudioPermission,requestCameraAndAudioPermission }
