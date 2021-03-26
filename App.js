import { StatusBar } from 'expo-status-bar'
import React from 'react'
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
  },
  h1: {
    fontSize: 40,
    fontFamily: 'PlayfairDisplay_400Regular',
    color: 'white',
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const App = () => {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
  })

  if (!fontsLoaded) return <AppLoading />

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} style={styles.image}>
        <Text style={styles.h1}>CoffeeMood</Text>
        <Text style={styles.p}>Café Sounds for Focus &amp; Study</Text>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  )
}

export default App
