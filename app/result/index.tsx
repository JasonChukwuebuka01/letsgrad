import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ResultPage() {
  return (
    <View style={styles.container}>
      <Text>ResultPage</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    }
})