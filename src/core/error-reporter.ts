import * as Sentry from '@sentry/react-native'

type User = {
  id?: string
  email?: string
  username?: string
}

const errorReporter = {
  isEnabled() {
    return !__DEV__
  },
  report(error: Error) {
    if (!errorReporter.isEnabled()) {
      console.error(error)
      return
    }
    Sentry.captureException(error)
  },
  registerUser(user: User) {
    Sentry.setUser(user)
  },
}

export default errorReporter
