import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function InfoPage() {

  return (
    <View style={styles.container}>
      <Text>Check out all Info at once </Text>
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