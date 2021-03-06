/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import {
  StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity,
} from 'react-native'
import AppLoading from 'expo-app-loading'
import {
  useFonts,
  // eslint-disable-next-line camelcase
  PlayfairDisplay_400Regular,
  // eslint-disable-next-line camelcase
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display'
import { Audio } from 'expo-av'
import bgImage from './assets/bg.jpg'
import quotesService from './src/services/quotesService'
import audioFile from './assets/cafe.m4a'
import playButtonImg from './assets/play-button.png'
import storeWithExpiry from './src/util/storeWithExpiry'
import logger from './src/util/logger'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  header: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  p: {
    fontSize: 16,
    fontFamily: 'PlayfairDisplay_400Regular',
    color: 'white',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textAlign: 'center',
    marginHorizontal: 32,
  },
  h1: {
    fontSize: 40,
    fontFamily: 'PlayfairDisplay_400Regular',
    color: 'white',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textAlign: 'center',
  },
  quoteBlock: {
    flex: 2,
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
  playButton: {
    width: 100,
    height: 100,
  },
})

const App = () => {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
  })
  const [quoteOfTheDay, setQuoteOfTheDay] = useState('Life is really simple, but we insist on making it complicated.')
  const [sound, setSound] = useState(null)
  const [soundLoaded, setSoundLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // on first render:
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        let quote = await storeWithExpiry.getItem('quoteOfTheDay')

        if (!quote) {
          quote = await quotesService.getQuoteOfTheDay()
          storeWithExpiry.setItem('quoteOfTheDay', quote, 24)
        }

        setQuoteOfTheDay(quote.q.trim())
      } catch (e) {
        logger.error(e)
      }
    }

    const loadAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
        })
        const { sound } = await Audio.Sound.createAsync(audioFile)
        await sound.setIsLoopingAsync(true)
        setSound(sound)
        setSoundLoaded(true)
      } catch (error) {
        logger.error(error)
      }
    }

    fetchQuote()
    loadAudio()
  }, [])

  const handlePlayButton = async () => {
    if (!isPlaying) {
      sound.playAsync()
      setIsPlaying(true)
    } else {
      sound.pauseAsync()
      setIsPlaying(false)
    }
  }

  if (!fontsLoaded || !soundLoaded) return <AppLoading />

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} style={styles.image}>
        <View style={styles.imageBlend}>

          <View style={styles.header}>
            <TouchableOpacity onPress={handlePlayButton}>
              <Image source={playButtonImg} resizeMethod="resize" resizeMode="contain" style={styles.playButton} onClick={handlePlayButton} />
            </TouchableOpacity>
            <Text style={styles.h1}>CoffeeMood</Text>
            <Text style={styles.p}>Caf?? Sounds for Focus &amp; Study</Text>
          </View>

          <View style={styles.quoteBlock}>
            <Text style={styles.p}>
              &quot;
              {quoteOfTheDay}
              &quot;
            </Text>
          </View>

          <StatusBar style="auto" />

        </View>
      </ImageBackground>
    </View>
  )
}

export default App
