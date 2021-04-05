const log = (message) => {
  // eslint-disable-next-line no-undef
  if (__DEV__) {
    console.log(message)
  }
}

const error = (message) => {
  // eslint-disable-next-line no-undef
  if (__DEV__) {
    console.error(message)
  }
}

const logger = {
  log,
  error,
}

export default logger
