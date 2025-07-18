import { fileFromObjectURL,methods } from '../utils'
import {service } from './middleware'

const { POST } = methods
/**
 * REST ROUTES
 */
const routes = {
  upload: () => 'upload',
}

/**
 * SERVICES
 */
export default {
  fileFromObjectURL: objectURL => fileFromObjectURL(objectURL),
  fileUpload: (form, callback, cancelToken) =>
    service(
      POST,
      routes.upload(),
      form,
      { cancelToken },
      { 'content-type': `multipart/form-data; boundary=${form._boundary}` },
      '',
      callback
    ),
}
