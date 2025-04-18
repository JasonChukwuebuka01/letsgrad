import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { Image } from 'react-native';
export default function ResultPage() {
  const route = useRoute();
  const { url } = route.params as { url: string };

  console.log('Received URL:', url); // Debugging line to check the URL received

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: url }}
        style={styles.image}
        resizeMode="contain"
        
      />
       <Text>{url}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    image: {
        width: '100%',
        height: '50%',
    }
})