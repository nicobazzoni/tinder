import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth'
const HomeScreen = () => {
    const {logout} = useAuth()

    const navigation = useNavigation()
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Go to Chat screen" onPress={(navigation.navigate("Chat"))} 
      />

      <Button title="Logout" onPress={logout} />
    </View>
  )
}

export default HomeScreen

