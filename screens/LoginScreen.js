import { View, Text, Button } from 'react-native'
import React from 'react'

import  useAuth  from '../hooks/useAuth'



const LoginScreen = () => {
    const { signInWithGoogle, loading } = useAuth()

   

    
  return (
    <View>
      <Text>{loading ? "Loading..." : "Login to the app"}</Text>
      <Button title="Sign in with Google" onPress={signInWithGoogle} />
    </View>
  )
}

export default LoginScreen