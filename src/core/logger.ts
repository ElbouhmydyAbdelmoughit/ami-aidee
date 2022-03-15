const debug = (key: string, message: string, ...args: any) => {
  if (__DEV__) {
    console.log(`debug.${key}/ ${message}`, ...args)
  }
}

const logger = {
  debug,
}

export default logger
