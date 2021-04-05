import axios from 'axios'
import logger from '../util/logger'

const baseUrl = 'https://zenquotes.io/api/random'

const getQuoteOfTheDay = async () => {
  try {
    const qod = await axios.get(baseUrl)
    return qod.data[0]
  } catch (error) {
    logger.error(error)
  }
}

export default {
  getQuoteOfTheDay,
}
