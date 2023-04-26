import { Platform } from 'react-native'

const HTTP_MEDIA_URL = 'http://d2ppax42vvtce1.cloudfront.net'
const HTTPS_MEDIA_URL = 'https://d2ppax42vvtce1.cloudfront.net'

const getShouldUseHttps = () => {
  if (Platform.OS === 'android' && Platform.Version <= 25) {
    return false
  }
  return true
}

const getMediaUrl = () => {
  if (!getShouldUseHttps()) {
    console.log('using http url', Platform.OS, Platform.Version)
    return HTTP_MEDIA_URL
  }
  console.log('using https url', Platform.OS, Platform.Version)
  return HTTPS_MEDIA_URL
}

const HTTP_API_URL = 'http://api.solution-ami.com'
const HTTPS_API_URL = 'https://api.solution-ami.com'

export const Env = {
  API_URL: getShouldUseHttps() ? HTTPS_API_URL : HTTP_API_URL,
  GRAPHQL_URL: 'https://graphql.solution-ami.com/v1/graphql',
  MEDIA_URL: getMediaUrl(),
}
