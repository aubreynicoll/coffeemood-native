import axios from 'axios'

const baseUrl = 'https://zenquotes.io/api/random'

const getQuoteOfTheDay = async () => {
  try {
    const qod = await axios.get(baseUrl)
    return qod.data[0]
  } catch (error) {
    console.error(error)
  }
}

export default {
  getQuoteOfTheDay,
}
