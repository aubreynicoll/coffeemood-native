import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import {
  StyleSheet, Text, View, ImageBackground,
} from 'react-native'
import AppLoading from 'expo-app-loading'
import {
  useFonts,
  // eslint-disable-next-line camelcase
  PlayfairDisplay_400Regular,
  // eslint-disable-next-line camelcase
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display'
import bgImage from './assets/bg.jpg'
import quotesService from './src/services/quotesService'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  p: {
    fontFamily: 'PlayfairDisplay_400Regular',
    color: 'white',
    textAlign: 'center',
  },
  h1: {
    fontSize: 40,
    fontFamily: 'PlayfairDisplay_400Regular',
    color: 'white',
    textAlign: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBlend: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.33)',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const App = () => {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
  })
  const [quoteOfTheDay, setQuoteOfTheDay] = useState('')
  const [quoteLoaded, setQuoteLoaded] = useState(false)

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const quote = await quotesService.getQuoteOfTheDay()
        setQuoteOfTheDay(quote)
        setQuoteLoaded(true)
      } catch (error) {
        console.log(error)
      }
    }
    fetchQuote()
  }, [])

  if (!fontsLoaded || !quoteLoaded) return <AppLoading />

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} style={styles.image}>
        <View style={styles.imageBlend}>
          <View>
            <Text style={styles.h1}>CoffeeMood</Text>
            <Text style={styles.p}>Café Sounds for Focus &amp; Study</Text>
          </View>
          <View>
            <Text style={styles.p}>{quoteOfTheDay.q}</Text>
          </View>
          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    </View>
  )
}

export default App
