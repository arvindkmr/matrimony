import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Providers from './src/navigation/Index'

const App = () => {
  return (
    
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={'transparent'} barStyle='dark-content' translucent={true} />
      <Providers />
    </View>
  )
}

export default App

const styles = StyleSheet.create({})  