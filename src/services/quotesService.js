import axios from 'axios'
import logger from '../util/logger'

const baseUrl = 'https://zenquotes.io/api/random'

const getQuoteOfTheDay = async () => {
  let qod

  try {
    qod = await axios.get(baseUrl)
  } catch (error) {
    logger.error(error)
  }

  return qod.data[0]
}

export default {
  getQuoteOfTheDay,
}
