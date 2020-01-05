import { Platform } from "react-native"

const HTTP_MEDIA_URL = "http://d2ppax42vvtce1.cloudfront.net"
const HTTPS_MEDIA_URL = "https://d2ppax42vvtce1.cloudfront.net"

const getMediaUrl = () => {
  if (Platform.OS === "android" && Platform.Version <= 25) {
    console.log("using http url", Platform.OS, Platform.Version)
    return HTTP_MEDIA_URL
  }
  console.log("using https url", Platform.OS, Platform.Version)
  return HTTPS_MEDIA_URL
}

export const Env = {
  API_URL: "http://15.188.62.36:3333",
  GRAPHQL_URL: "http://15.188.62.36:8080/v1/graphql",
  MEDIA_URL: getMediaUrl(),
}
