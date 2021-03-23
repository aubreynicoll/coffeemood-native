import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const App = () => {
  return (
    <View style={styles.container}>
      <Text h1>CoffeeMood&trade;</Text>
      <Text h2>Café Sounds for Focus &amp; Study</Text>
      <StatusBar style="auto" />
    </View>
  )
}

export default App
