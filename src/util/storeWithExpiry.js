import AsyncStorage from '@react-native-async-storage/async-storage'

const setItem = async (key, value, hoursToLive) => {
  const date = new Date()
  const expiry = date.setHours(date.getHours() + hoursToLive)

  const item = {
    value,
    expiry,
  }

  try {
    await AsyncStorage.setItem(key, JSON.stringify(item))
  } catch (e) {
    console.error(e)
  }
}

const getItem = async (key) => {
  const date = new Date()
  let item

  try {
    item = JSON.parse(await AsyncStorage.getItem(key))
  } catch (e) {
    console.error(e)
  }

  if (!item || date > item.expiry) {
    return null
  }

  return item.value
}

const storeWithExpiry = {
  setItem,
  getItem,
}

export default storeWithExpiry
