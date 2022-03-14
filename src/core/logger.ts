const debug = (message: string, ...args: any) => {
  console.log(`[JS_DEBUG] ${message}`, ...args)
}

const logger = {
  debug,
}

export default logger
