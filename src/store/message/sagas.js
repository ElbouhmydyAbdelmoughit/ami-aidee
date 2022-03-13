import {
  takeLatest,
  put,
  call,
  race,
  take,
  takeEvery,
} from 'redux-saga/effects'
import { MessagesService, UploadService } from '../../services'
import { LoaderActions } from '../loader'
import { SnackActions } from '../snackBar'
import { types, default as MessageAction } from './actions'
import { notifierAuthorization, notifierAdd, notifierAddMany } from 'src/utils'
import axios from 'axios'
import moment from 'moment'

/**
 * Use it for upload a file
 * @param {*} formData
 */
function* sendFormData(formData) {
  const cancelSource = axios.CancelToken.source()
  const uploadCallBack = () => {}

  const { uploadCall = [null, null], cancelUpload = null } = yield race({
    uploadCall: call(
      UploadService.fileUpload,
      formData,
      uploadCallBack,
      cancelSource.token
    ),
    cancelUpload: take(({ type, fileId }) => console.log(`${type}: ${fileId}`)),
  })

  if (uploadCall[0] != null) {
    return null
  } else {
    console.log(uploadCall[1].data.path)
    return uploadCall[1].data
  }
}

/**
 * Saga - Fetch all current message
 * @param {*} param0
 */
function* messagesRequest({ id }) {
  const start = moment()
    .subtract(5, 'days')
    .format('YYYY-MM-DD')
  const end = moment()
    .add(5, 'days')
    .format('YYYY-MM-DD')

  const [error, response] = yield call(MessagesService.messageBetween, {
    startDate: start,
    endDate: end,
    helpedUserId: id,
  })
  if (!error && response) {
    //notifierAddMany(response.messages)
    yield put(MessageAction.messagesSuccess(response.messages))
  } else {
    yield put(MessageAction.messagesFailure())
  }
}

/**
 * Saga - Create a new message
 * @param {*} param0
 */
function* messageCreateRequest({ data }) {
  const {
    user,
    activity,
    subject,
    range_date,
    imgURL,
    locate,
    moment_diffuse,
    time_diffuse,
    reccurence,
  } = data.message
  let message = {
    auxiliary_id: 2,
    helped_user_id: 2,
    activite: activity,
    subjet: subject,
    diffusion_start_date: range_date[0].format('YYYY-MM-DD'),
    diffusion_end_date: range_date[1].format('YYYY-MM-DD'),
    location: locate,
    moment: moment_diffuse,
    moment_time: time_diffuse.format('HH:mm'),
    picture_url: '',
    video_url: '',
  }

  /**
   * 1 - send Image
   * */
  const FormData = require('form-data')
  var formData = new FormData()
  formData.append('file', imgURL.originFileObj, imgURL.originFileObj.name)
  const result = yield call(sendFormData, formData)
  if (result == null) {
    yield put(LoaderActions.loaded())
    yield put(MessageAction.messageCreateFailure())
    yield put(SnackActions.displayError('messages_create_failure'))
    return null
  }
  message.picture_url = result.path

  /**
   * 2 - Send Video
   *  */
  const fileVideo = yield call(UploadService.fileFromObjectURL, data.video)

  var videoFormData = new FormData()
  var mime = require('mime-types')
  var contentType = fileVideo.headers['content-type']
  videoFormData.append(
    'file',
    fileVideo.data,
    `testounet.${mime.extension(contentType)}`
  )
  const resultVideo = yield call(sendFormData, videoFormData)
  if (resultVideo == null) {
    yield put(LoaderActions.loaded())
    yield put(MessageAction.messageCreateFailure())
    yield put(SnackActions.displayError('messages_create_failure'))
    return null
  }
  message.video_url = resultVideo.path

  /**
   * 3 - Send Message
   *  */
  const [error, response] = yield call(MessagesService.createMessage, message)

  if (!error && response) {
    const messages = response.insert_messages.returning
    yield put(MessageAction.messageCreateSuccess(messages))
    yield put(LoaderActions.loaded())
    yield put(SnackActions.displayInfo('messages_create_success'))
  } else {
    yield put(LoaderActions.loaded())
    yield put(MessageAction.messageCreateFailure())
    yield put(SnackActions.displayError('messages_create_failure'))
  }
}

export default [
  takeLatest(types.MESSAGES_REQUEST, messagesRequest),
  takeLatest(types.MESSAGES_CREATE_REQUEST, messageCreateRequest),
]
