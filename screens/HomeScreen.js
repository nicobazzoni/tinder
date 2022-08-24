import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native'
import React, {useLayoutEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth'


const HomeScreen = () => {
    const {logout} = useAuth()

    const navigation = useNavigation()

    useLayoutEffect(() => { 
        navigation.setOptions({
        headerShown: false,
    })
}, [])

  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
      <Button title="Go to Chat screen" onPress={(navigation.navigate("Chat"))} 
      />

      <Button title="Logout" onPress={logout} />
    </SafeAreaView>
  )
}

export default HomeScreen

